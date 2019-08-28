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
  time_ago: string;
  comments_count: number;
  comments: CommentType[];
  type: string;
  url: string;
  domanin: string;
}

export interface User {
  id: string;
  created_time: number;
  created: string;
  karma: number;
  avg: string;
  about: string;
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

const fetchUser = (id: string): Promise<User> => {
  return fetch(`https://node-hnapi.herokuapp.com/user/${id}`).then(
    response => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json() as Promise<User>;
    }
  );
};

export default class NewsStore {
  @observable news: NewsItem[][] = new Array(10);
  @observable newest: NewsItem[][] = new Array(10);
  @observable show: NewsItem[][] = new Array(10);
  @observable ask: NewsItem[][] = new Array(10);
  @observable jobs: NewsItem[][] = new Array(10);
  @observable isLoading: boolean = false;
  @observable requestCount: number = 0;
  @observable items: NewsItem[] = [];
  @observable users: User[] = []

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
  loadShow(page: number) {
    this.isLoading = true;
    this.requestCount++;
    fetchItems("show", page)
      .then(show => {
        this.show[page] = show;
        if (--this.requestCount === 0) this.isLoading = false;
      })
      .catch(e => {
        if (--this.requestCount === 0) this.isLoading = false;
        this.show[page] = [];
      });
  }

  @action
  loadAsk(page: number) {
    this.isLoading = true;
    this.requestCount++;
    fetchItems("ask", page)
      .then(ask => {
        this.ask[page] = ask;
        if (--this.requestCount === 0) this.isLoading = false;
      })
      .catch(e => {
        if (--this.requestCount === 0) this.isLoading = false;
        this.ask[page] = [];
      });
  }

  @action
  loadJobs(page: number) {
    this.isLoading = true;
    this.requestCount++;
    fetchItems("jobs", page)
      .then(jobs => {
        this.jobs[page] = jobs;
        if (--this.requestCount === 0) this.isLoading = false;
      })
      .catch(e => {
        if (--this.requestCount === 0) this.isLoading = false;
        this.jobs[page] = [];
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

  @action
  loadUser(id: string) {
    this.isLoading = true;
    this.requestCount++;
    fetchUser(id).then(user => {
      const existingUser = this.users.find(user => user.id === id);
      console.log('existing user', existingUser)
      if(existingUser) {
        extendObservable(existingUser, user);
      }else {
        this.users.push(user);
      }

      if (--this.requestCount === 0) this.isLoading = false;
    }).catch(e => {
      if(--this.requestCount === 0)  this.isLoading = false;
    }) 
  }
}
