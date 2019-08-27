import React from "react";
import { observer, inject } from "mobx-react";
import NewsStore from "../stores/NewsStore";
import { ItemList } from "./ItemList";
import { match } from "react-router";
import Pagination from "./Pagination";

export const NewestStories = inject("store")(
  observer(
    class TopStories extends React.Component<{
      store?: NewsStore;
      match: match<{ page: string }>;
    }> {
      componentDidMount() {
        const page = Number(this.props.match.params.page);
        if (!this.props.store!.newest[page]) {
          this.props.store!.loadNewest(page);
        }
      }

      render() {
        const { isLoading, newest } = this.props.store!;
        const page = Number(this.props.match.params.page);
        if (isLoading || !newest[page]) return <div>Loading...</div>;
        if (!isLoading && newest[page] && newest[page].length === 0)
          return <div>No items found</div>;
        return (
          <div>
            <Pagination />
            <ItemList items={newest[page]} />
          </div>
        );
      }
    }
  )
);
