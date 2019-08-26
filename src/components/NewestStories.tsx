import React from "react";
import { observer } from "mobx-react";
import NewsStore, { NewsItem } from "../stores/NewsStore";

export const NewestStories: React.FC<{ store: NewsStore }> = observer(props => {
  if (!props.store) return <div>fuuu</div>;
  const { isLoading } = props.store;
  const items = props.store.newest;
  if (isLoading) return <div>Loading...</div>;
  console.log('fffff', items)
  return (
    <div>
      {items.map((item: NewsItem) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
});
