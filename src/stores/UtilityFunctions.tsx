import {NewsItem, User} from './Types'

export const fetchItems = (type: string, page: number): Promise<NewsItem[]> => {
  return fetch(`https://node-hnapi.herokuapp.com/${type}?page=${page}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<NewsItem[]>;
    }
  );
};

export const fetchItem = (id: number): Promise<NewsItem> => {
  return fetch(`https://node-hnapi.herokuapp.com/item/${id}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<NewsItem>;
  });
};

export const fetchUser = (id: string): Promise<User> => {
  return fetch(`https://node-hnapi.herokuapp.com/user/${id}`).then(
    response => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json() as Promise<User>;
    }
  );
};