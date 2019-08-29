import React from "react";
import { observer, inject } from "mobx-react";
import NewsStore from "../stores/NewsStore";
import { ItemList } from "./ItemList";
import { match } from "react-router-dom";
import Pagination from "./Pagination";
import { Loading } from "./Loading";

export const Stories =inject("store")(
  observer(
    class TopStories extends React.Component<{
      store?: NewsStore;
      match: match<{ page: string }>;
      history: { push: Function };
      type: string;
    }> {
      componentDidMount() {
        const page = Number(this.props.match.params.page);
        this.props.store!.loadPage(this.props.type, page);
      }

      onPageChange = (index: number) => {
        this.props.store!.loadPage(this.props.type, index);
        this.props.history.push(`/${this.props.type}/${index}`);
      };

      render() {
        const { isLoading } = this.props.store!;
        const index = Number(this.props.match.params.page);
        const page = this.props.store!.page(this.props.type, index)
        return (
          <div>
            <Pagination onChange={this.onPageChange} />
            {isLoading || !page ? (
              <Loading />
            ) : (
              <ItemList items={page.items} />
            )}
          </div>
        );
      }
    }
  )
);
