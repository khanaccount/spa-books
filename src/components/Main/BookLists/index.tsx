import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import s from "./index.module.scss";
import img1 from "/img/1.png";
import { Books } from "../../../types";

import {
  Skeleton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1200, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 958, min: 0 },
    items: 3,
  },
  smallMobile: {
    breakpoint: { max: 700, min: 0 },
    items: 2,
  },
  extraSmallMobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
  },
};

interface BookListsProps {
  books: Books;
  isLoading: boolean;
  filter: string;
  handleFilter: (event: SelectChangeEvent<string>) => void;
}
const BookLists: React.FC<BookListsProps> = ({ books, isLoading, filter, handleFilter }) => {
  return (
    <React.Fragment>
      {isLoading ? (
        <div className={s.booksLists}>
          <FormControl fullWidth sx={{ mb: "20px" }}>
            <InputLabel>Фильтрация</InputLabel>
            <Select id="demo-simple-select" label="Фильтра" value={filter} onChange={handleFilter}>
              <MenuItem value="rating">По рейтингу</MenuItem>
              <MenuItem value="author">По автору</MenuItem>
              <MenuItem value="">Без фильтров</MenuItem>
            </Select>
          </FormControl>
          {Object.keys(books)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map((year) => (
              <React.Fragment key={year}>
                <p className={s.dateOfIssue}>{year}</p>
                <Carousel className={s.carousel} responsive={responsive}>
                  {books[year]
                    .sort((a, b) => {
                      if (filter === "rating") {
                        return Number(b.rating) - Number(a.rating);
                      } else if (filter === "author") {
                        return a.author.localeCompare(b.author);
                      } else {
                        return 0;
                      }
                    })
                    .map((book, index) => (
                      <div key={index} className={s.book}>
                        <p className={s.nameBook}>{book.name}</p>
                        <img src={img1} alt="book" />
                        <p className={s.author}>{book.author}</p>
                        <p>Выпуск: {book.age} год</p>
                        <p>Рейтинг: {book.rating}/10</p>
                        <p className={s.isbn}>ISBN: {book.isbn}</p>
                      </div>
                    ))}
                </Carousel>
              </React.Fragment>
            ))}
        </div>
      ) : (
        <React.Fragment>
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className={s.skeletonLists}>
              {Array.from({ length: 5 }, (_, index) => (
                <React.Fragment key={index}>
                  <Skeleton
                    animation="wave"
                    className={s.skeletonBlock}
                    variant="rounded"
                    width={230}
                    height={600}
                  />
                </React.Fragment>
              ))}
            </div>
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default BookLists;
