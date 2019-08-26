import { observable } from "mobx";

export interface NewsItem {
  id: string;
  title: string;
  points: number;
  user: string;
  time: number;
  time_Ago: string;
  comments_count: number;
  type: string;
  url: string;
  domanin: string;
}

const fetchItems = (type: string, page: number): Promise<NewsItem[]> => {
  return fetch(`https://node-hnapi.herokuapp.com/${type}?page=${page}`)
    .then((response) => {
      if(!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<NewsItem[]>;
    })
};

export default class NewsStore {
  @observable news: NewsItem[] = [];
  @observable newest: NewsItem[] = [];
  @observable isLoading: boolean = true;

  constructor() {
    this.loadNews();
    this.loadNewest();
  }

  loadNewest() {
    this.isLoading = true;
    fetchItems('newest', 1).then((newest) => {
      this.newest = newest;
      this.isLoading = false;
    });
  }

  loadNews() {
    this.isLoading = true;
    fetchItems('news', 1).then((news) => {
      this.news = news;
      this.isLoading = false;
    });
  }
}
