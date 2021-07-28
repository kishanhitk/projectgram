export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  slug: string;
  images: string[];
  souceLink: string;
  website: string;
  upvote_count: number;
  hashtags: string[];
  creator: User;
}
export interface User {
  firstName: string;
}
