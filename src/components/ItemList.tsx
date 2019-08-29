import React from "react";
import { NewsItem } from "../stores/Types";
import {Container} from './SharedStyles'
import { Item } from "./Item";

export const ItemList: React.FC<{ items: NewsItem[] }> = props => {
  const { items } = props;
  return (
    <Container>
      {
        items.length === 0 && (
          "No items found."
        )
      }
      {items.map((item: NewsItem) => (
        <Item key={item.id} item={item} />
      ))}
    </Container>
  );
};
