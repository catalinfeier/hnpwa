import React from "react";
import { NewsItem } from "../stores/NewsStore";
import { NavLink } from "react-router-dom";

export const ItemList: React.FC<{ items: NewsItem[] }> = props => {
  const { items } = props;
  return (
    <React.Fragment>
      {items.map((item: NewsItem) => (
        <div key={item.id}>
          Title:{item.title}
          <div>
            <NavLink to={`/item/${item.id}`}>{item.comments_count} comments</NavLink>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};
