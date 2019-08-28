import React from "react";
import { observer, inject } from "mobx-react";
import NewsStore from "../stores/NewsStore";
import { ItemList } from "./ItemList";
import { match } from "react-router-dom";
import Pagination from "./Pagination";
import {Loading} from './Loading'

export const JobsStories = inject("store")(
  observer(
    class JobsStories extends React.Component<{
      store?: NewsStore;
      match: match<{ page: string }>;
      history: { push: Function };
    }> {
      componentDidMount() {
        const page = Number(this.props.match.params.page);
        if (!this.props.store!.jobs[page] && page > 0 && page <= 10) {
          this.props.store!.loadJobs(page);
        }
      }

      onPageChange = (page: number) => {
        const { history } = this.props;
        if (!this.props.store!.jobs[page]) {
          this.props.store!.loadJobs(page);
        }
        history.push(`/jobs/${page}`);
      };

      render() {
        const { isLoading, jobs } = this.props.store!;
        const page = Number(this.props.match.params.page);

        return (
          <div>
            <Pagination onChange={this.onPageChange} />
            {isLoading || !jobs[page] ? (
              <Loading />
            ) : (
              <ItemList items={jobs[page]} />
            )}
          </div>
        );
      }
    }
  )
);
