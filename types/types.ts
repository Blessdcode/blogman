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
  publicId?:string
  links: null | string[];
  category?: string;
  authorEmail?: string;
  name?: string;
  catName?: string;
  createdAt: string;
  author: {
    name: string;
  };
};
