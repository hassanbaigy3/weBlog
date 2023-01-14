export type Blog = {
  uid: string;
  title: string;
  content: string;
  date: string;
  displayName: string;
  postedBy: string;
};
export type EditBlog = {
  uid: string | null;
  title: string | null;
  content: string | null;
};
