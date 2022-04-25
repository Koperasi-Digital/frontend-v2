import { FormikProps } from 'formik';
import { User } from './account';

// ----------------------------------------------------------------------

export type NewPostFormValues = {
  title: string;
  description: string;
  cover: File | any;
};

export type NewPostItemFormValues = {
  title: string;
  description: string;
  content: string;
};

export type NewPostViewFormikInstance = FormikProps<NewPostFormValues>;

export type CourseState = {
  isLoading: boolean;
  error: boolean;
  courseAdminList: CourseAdminList[];
  courseList: CourseList[];
  course: CourseDetailState | null;
  coursePost: CourseItemPost | null;
  refresh: boolean;
  totalPage: number;
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

export type CourseList = {
  id: string;
  cover: string;
  title: string;
  description: string;
  created_at: Date | string | number;
  author: User;
  is_published: boolean;
};

export type CourseDetailState = {
  id: string;
  cover: string;
  title: string;
  description: string;
  created_at: Date | string | number;
  author: User;
  is_published: boolean;
  course_items: CourseItem[];
};

export type CourseItem = {
  id: string;
  title: string;
  description: string;
  created_at: Date | string | number;
  body: string;
  order: number;
};

export type CourseItemWithAuthor = {
  id: string;
  title: string;
  description: string;
  created_at: Date | string | number;
  body: string;
  order: number;
  author: User;
};

export type CourseItemPost = {
  course: CourseItemWithAuthor;
  courseParentTitle: string;
  courseBefore: CourseItem | null;
  courseAfter: CourseItem | null;
  courseIsPublished: boolean;
};

export type CourseAdminList = {
  id: string;
  title: string;
  created_at: Date | string | number;
  is_published: boolean;
  author: User;
  course_items: CourseItem[];
};
