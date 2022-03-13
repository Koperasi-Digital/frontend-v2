export type ForumPostType = {
  id: string;
  author: {
    id: string;
    avatarUrl: string;
    name: string;
  };
  createdAt: Date | string | number;
  media: string;
  topic: string;
  message: string;
  comments: {
    id: string;
    author: {
      id: string;
      avatarUrl: string;
      name: string;
    };
    createdAt: Date | string | number;
    message: string;
  }[];
};
