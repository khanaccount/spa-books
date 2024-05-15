export type Books = {
  [key: string]: Book[];
};

export type Book = {
  author: string;
  isbn: string;
  name: string;
  age: number;
  rating: number | string;
};
