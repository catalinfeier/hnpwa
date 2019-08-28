import React from "react";
import { observer, inject } from "mobx-react";
import NewsStore from "../stores/NewsStore";
import { ItemList } from "./ItemList";
import { match } from "react-router-dom";
import Pagination from "./Pagination";
import { Loading } from "./Loading";

export const TopStories = inject("store")(
  observer(
    class TopStories extends React.Component<{
      store?: NewsStore;
      match: match<{ page: string }>;
      history: { push: Function };
    }> {
      componentDidMount() {
        const page = Number(this.props.match.params.page);
        if (!this.props.store!.news[page] && page > 0 && page <= 10) {
          this.props.store!.loadNews(page);
        }
      }

      onPageChange = (page: number) => {
        const { history } = this.props;
        if (!this.props.store!.news[page]) {
          this.props.store!.loadNews(page);
        }
        history.push(`/news/${page}`);
      };

      render() {
        const { isLoading, news } = this.props.store!;
        const page = Number(this.props.match.params.page);
        return (
          <div>
            <Pagination onChange={this.onPageChange} />
            {isLoading || !news[page] ? (
              <Loading />
            ) : (
              <ItemList items={news[page]} />
            )}
          </div>
        );
      }
    }
  )
);
