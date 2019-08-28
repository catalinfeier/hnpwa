import React from "react";
import { observer, inject } from "mobx-react";
import NewsStore from "../stores/NewsStore";
import { ItemList } from "./ItemList";
import { match } from "react-router";
import Pagination from "./Pagination";
import { Loading } from "./Loading";

export const NewestStories = inject("store")(
  observer(
    class TopStories extends React.Component<{
      store?: NewsStore;
      match: match<{ page: string }>;
      history: { push: Function };
    }> {
      componentDidMount() {
        const page = Number(this.props.match.params.page);
        if (!this.props.store!.newest[page]) {
          this.props.store!.loadNewest(page);
        }
      }

      onPageChange = (page: number) => {
        const { history } = this.props;
        if (!this.props.store!.newest[page]) {
          this.props.store!.loadNewest(page);
        }
        history.push(`/newest/${page}`);
      };

      render() {
        const { isLoading, newest } = this.props.store!;
        const page = Number(this.props.match.params.page);
        return (
          <div>
            <Pagination onChange={this.onPageChange} />
            {isLoading || !newest[page] ? (
              <Loading />
            ) : (
              <ItemList items={newest[page]} />
            )}
          </div>
        );
      }
    }
  )
);
