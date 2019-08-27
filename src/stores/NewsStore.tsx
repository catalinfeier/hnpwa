import { observable, action, extendObservable } from "mobx";

export interface CommentType {
  id: number;
  level: number;
  user: string;
  time: number;
  time_ago: string;
  content: string;
  comments: CommentType[];
}

export interface NewsItem {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_Ago: string;
  comments_count: number;
  comments: CommentType[];
  type: string;
  url: string;
  domanin: string;
}

const fetchItems = (type: string, page: number): Promise<NewsItem[]> => {
  return fetch(`https://node-hnapi.herokuapp.com/${type}?page=${page}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<NewsItem[]>;
    }
  );
};

const fetchItem = (id: number): Promise<NewsItem> => {
  return fetch(`https://node-hnapi.herokuapp.com/item/${id}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<NewsItem>;
  });
};

export default class NewsStore {
  @observable news: NewsItem[][] = new Array(10);
  @observable newest: NewsItem[][] = new Array(10);
  @observable isLoading: boolean = false;
  @observable requestCount: number = 0;
  @observable items: NewsItem[] = [];

  @action
  loadNewest(page: number) {
    this.isLoading = true;
    this.requestCount++;
    fetchItems("newest", page)
      .then(newest => {
        this.newest[page] = newest;
        if (--this.requestCount === 0) this.isLoading = false;
      })
      .catch(e => {
        if (--this.requestCount === 0) this.isLoading = false;
        this.newest[page] = [];
      });
  }

  @action
  loadNews(page: number) {
    this.isLoading = true;
    this.requestCount++;
    fetchItems("news", page)
      .then(news => {
        this.news[page] = news;
        if (--this.requestCount === 0) this.isLoading = false;
      })
      .catch(e => {
        if (--this.requestCount === 0) this.isLoading = false;
        this.news[page] = [];
      });
  }

  @action
  loadItem(id: number) {
    this.isLoading = true;
    this.requestCount++;

    fetchItem(id)
      .then(item => {
        const existingItem = this.items.find(item => item.id === id);
        if (existingItem) {
          extendObservable(existingItem, item);
        } else {
          this.items.push(item);
        }
        if (--this.requestCount === 0) this.isLoading = false;
      })
      .catch(e => {
        if (--this.requestCount === 0) this.isLoading = false;
      });
  }
}
