import { FormikProps } from 'formik';
import { User } from './account';

// ----------------------------------------------------------------------

export type NewPostFormValues = {
  title: string;
  description: string;
  content: string;
  cover: File | any;
  tags: string[];
};

export type NewPostViewFormikInstance = FormikProps<NewPostFormValues>;

export type BlogState = {
  isLoading: boolean;
  error: boolean;
  blogVerificationList: BlogVerificationList[];
  ownPosts: BlogList[];
  posts: BlogList[];
  post: BlogPost | null;
  refresh: boolean;
  hasMore: boolean;
  title: string;
  sort: string;
  page: number;
};

export type BlogPost = {
  id: string;
  cover: string;
  title: string;
  description: string;
  created_at: Date | string | number;
  view: number;
  author: User;
  tags: string;
  body: string;
  is_verified: boolean;
};

export type BlogList = {
  id: string;
  cover: string;
  title: string;
  created_at: Date | string | number;
  view: number;
  author: User;
  tags: string;
  is_verified: boolean;
};

export type BlogVerificationList = {
  id: string;
  title: string;
  created_at: Date | string | number;
  is_verified: boolean;
  author: User;
};
