import React from "react";
import { observer, inject } from "mobx-react";
import NewsStore from "../stores/NewsStore";
import { match } from "react-router-dom";
import { Comment } from "./Comment";

export const Item = inject("store")(
  observer(
    class TopStories extends React.Component<{
      store?: NewsStore;
      match: match<{ id: string }>;
      history: { push: Function };
    }> {
      componentDidMount() {
        const id = Number(this.props.match.params.id);
        this.props.store!.loadItem(id);
      }

      render() {
        const id = Number(this.props.match.params.id);
        const { isLoading, items } = this.props.store!;
        const item = items.find(item => item.id === id);
        if (isLoading || !item) return <div>Loading...</div>;

        return (
          <div>
            {item.id}
            {item.comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        );
      }
    }
  )
);
