export type TCategories = {
  id: number;
  title: string;
  catName: string;
};

export type TPost = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: string;
  links: null | string[];
  category?: string;
};
