export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  slug: string;
  bannerImage: PublicFile;
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
  bio: string;
  avatar: PublicFile;
}
export interface PublicFile {
  url: string;
  key: string;
}
export interface Comment {
  body: string;
  id: string;
  commenter: User;
}
