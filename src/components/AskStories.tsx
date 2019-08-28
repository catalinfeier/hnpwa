import React from "react";
import { observer, inject } from "mobx-react";
import NewsStore from "../stores/NewsStore";
import { ItemList } from "./ItemList";
import { match } from "react-router-dom";
import Pagination from "./Pagination";
import {Loading} from './Loading'

export const AskStories = inject("store")(
  observer(
    class AskStories extends React.Component<{
      store?: NewsStore;
      match: match<{ page: string }>;
      history: { push: Function };
    }> {
      componentDidMount() {
        const page = Number(this.props.match.params.page);
        if (!this.props.store!.ask[page] && page > 0 && page <= 10) {
          this.props.store!.loadAsk(page);
        }
      }

      onPageChange = (page: number) => {
        const { history } = this.props;
        if (!this.props.store!.ask[page]) {
          this.props.store!.loadAsk(page);
        }
        history.push(`/ask/${page}`);
      };

      render() {
        const { isLoading, ask } = this.props.store!;
        const page = Number(this.props.match.params.page);

        return (
          <div>
            <Pagination onChange={this.onPageChange} />
            {isLoading || !ask[page] ? (
              <Loading />
            ) : (
              <ItemList items={ask[page]} />
            )}
          </div>
        );
      }
    }
  )
);
