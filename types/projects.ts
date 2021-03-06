export interface BaseEntity {
  createdAt: Date;
  id: string;
}
export interface Project extends BaseEntity {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  slug: string;
  bannerImage: PublicFile;
  screenshots: string[];
  sourceLink: string;
  website: string;
  upvote_count: number;
  hashtags: Tag[];
  creator: User;
}
export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  avatar: string;
}
export interface PublicFile {
  url: string;
  key: string;
}
export interface Comment extends BaseEntity {
  body: string;
  id: string;
  commenter: User;
}
export interface Tag extends BaseEntity {
  label: string;
  value: string;
  name: string;
}
