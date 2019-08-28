import React from "react";
import { observer, inject } from "mobx-react";
import NewsStore from "../stores/NewsStore";
import { ItemList } from "./ItemList";
import { match } from "react-router-dom";
import Pagination from "./Pagination";
import {Loading} from './Loading'

export const ShowStories = inject("store")(
  observer(
    class ShowStories extends React.Component<{
      store?: NewsStore;
      match: match<{ page: string }>;
      history: { push: Function };
    }> {
      componentDidMount() {
        const page = Number(this.props.match.params.page);
        if (!this.props.store!.show[page] && page > 0 && page <= 10) {
          this.props.store!.loadShow(page);
        }
      }

      onPageChange = (page: number) => {
        const { history } = this.props;
        if (!this.props.store!.show[page]) {
          this.props.store!.loadShow(page);
        }
        history.push(`/show/${page}`);
      };

      render() {
        const { isLoading, show } = this.props.store!;
        const page = Number(this.props.match.params.page);

        return (
          <div>
            <Pagination onChange={this.onPageChange} />
            {isLoading || !show[page] ? (
              <Loading />
            ) : (
              <ItemList items={show[page]} />
            )}
          </div>
        );
      }
    }
  )
);
