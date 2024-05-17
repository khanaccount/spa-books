import React, { useState, useEffect } from "react";
import s from "./index.module.scss";

import BookLists from "./BookLists";
import BestBooks from "./BestBooks";

import { ref, onValue, remove } from "firebase/database";
import { SelectChangeEvent } from "@mui/material";
import { db } from "../../config/firebaseConfig";
import { Books } from "../../types";
import { Book } from "../../types";

const Main: React.FC = () => {
  const [books, setBooks] = useState<Books>({});
  const [originalBooks, setOriginalBooks] = useState<Books>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const booksRef = ref(db, "books");

    onValue(booksRef, (snapshot) => {
      setBooks(snapshot.val());
      setOriginalBooks(snapshot.val());
      setIsLoading(true);
    });
  }, []);

  const handleFilter = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    if (value === "") {
      setBooks(originalBooks);
    }
    setFilter(value);
  };

  const handleDelete = (year: string, id: number) => {
    const yearKey = year || "noPublicationYear";
    const booksRef = ref(db, `books/${yearKey}/${id}`);
    remove(booksRef);
  };

  const handleFindBest = () => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 3);

    let bestBook: Book | null = null;
    let highestRating = 0;

    for (const year in books) {
      books[year].forEach((book) => {
        const bookPublicationDate = new Date(parseInt(year), 0);

        // не менее 3 лет назад
        if (bookPublicationDate <= currentDate) {
          if (Number(book.rating) > highestRating) {
            highestRating = Number(book.rating);
            bestBook = { ...book, publicationYear: parseInt(year) };
          } else if (Number(book.rating) === highestRating && bestBook) {
            // выбираем книгу случайным образом
            bestBook =
              Math.random() < 0.5 ? { ...book, publicationYear: parseInt(year) } : bestBook;
          }
        }
      });
    }
    return bestBook;
  };

  return (
    <main className={s.main}>
      <BestBooks isLoading={isLoading} bestBook={handleFindBest()} />
      <BookLists
        booksWithoutYear={books.noPublicationYear}
        books={books}
        isLoading={isLoading}
        filter={filter}
        handleDelete={handleDelete}
        handleFilter={handleFilter}
      />
    </main>
  );
};

export default Main;
