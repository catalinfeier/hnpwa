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

export interface PageList {
  items: NewsItem[];
  type: string;
  index: number;
}

export interface User {
  id: string;
  created_time: number;
  created: string;
  karma: number;
  avg: string;
  about: string;
}