export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  slug: string;
  bannerImage: string;
  screenshots: string[];
  souceLink: string;
  website: string;
  upvote_count: number;
  hashtags: string[];
  creator: User;
}
export interface User {
  firstName: string;
  username: string;
  bio:string
}
