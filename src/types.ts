export type Books = {
  [key: string]: Book[];
};

export type Book = {
  author: string;
  isbn: string;
  name: string;
  id: number;
  rating: number | string;
  publicationYear: number | string;
};
