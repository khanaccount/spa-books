import React from "react";
import s from "./index.module.scss";
import img1 from "/img/1.png";
import { Book } from "../../../types";
import { Skeleton } from "@mui/material";

interface BestBooksProps {
  bestBook: Book | null;
  isLoading: boolean;
}

const BestBooks: React.FC<BestBooksProps> = ({ bestBook, isLoading }) => {
  return (
    <div className={s.bestBooks}>
      <h1>Рекомендация лучшей книги</h1>
      {!isLoading || !bestBook ? (
        <React.Fragment>
          <div className={s.skeletonLists}>
            <React.Fragment>
              <Skeleton
                animation="wave"
                className={s.skeletonBlock}
                variant="rounded"
                width={240}
                height={600}
              />
            </React.Fragment>
          </div>
        </React.Fragment>
      ) : (
        <div key={bestBook.author} className={s.book}>
          <p className={s.nameBook}>{bestBook.name}</p>
          <img src={img1} alt="book" />
          <p className={s.author}>{bestBook.author}</p>
          <p>Выпуск: {bestBook.age} год</p>
          <p>Рейтинг: {bestBook.rating}/10</p>
          <p className={s.isbn}>ISBN: {bestBook.isbn}</p>
        </div>
      )}
    </div>
  );
};

export default BestBooks;
