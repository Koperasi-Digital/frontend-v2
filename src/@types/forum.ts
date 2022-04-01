import { User } from './account';

export type ForumPostType = {
  id: string;
  author: User;
  created_at: Date | string | number;
  media: string | null;
  topic: string;
  message: string;
  comments: CommentType[];
};

export type CommentType = {
  id: string;
  author: User;
  created_at: Date | string | number;
  message: string;
};
