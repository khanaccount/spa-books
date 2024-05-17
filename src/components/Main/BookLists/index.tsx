import React, { useState } from "react";
import { ref, update, set, get, child } from "firebase/database";
import { db } from "../../../config/firebaseConfig";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import s from "./index.module.scss";
import img1 from "/img/1.png";
import { Books } from "../../../types";
import { Book } from "../../../types";
import EditBook from "../EditBook";
import AddBooks from "../AddBooks";

import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

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
  handleDelete: (year: string, id: number) => void;
  booksWithoutYear: Book[];
}

const BookLists: React.FC<BookListsProps> = ({
  books,
  isLoading,
  filter,
  handleFilter,
  handleDelete,
  booksWithoutYear,
}) => {
  const [editingBook, setEditingBook] = useState<{ year: string; book: Book } | null>(null);

  const handleEdit = (year: string, book: Book) => {
    setEditingBook({ year, book });
  };

  const handleSave = async (updatedBook: Book) => {
    if (editingBook) {
      const bookRef = ref(db, `books/${editingBook.year || "noPublicationYear"}/${updatedBook.id}`);
      await update(bookRef, updatedBook);
      setEditingBook(null);
    }
  };

  const handleAdd = async (newBook: Book) => {
    const year = newBook.publicationYear || "noPublicationYear";
    const booksRef = ref(db, `books/${year}`);

    const snapshot = await get(booksRef);

    let maxId = 0;
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const book = childSnapshot.val();
        if (book.id > maxId) {
          maxId = book.id;
        }
      });
    }

    const newId = maxId + 1;

    // Добавляем новую книгу
    const newBookRef = child(booksRef, `${newId}`);
    await set(newBookRef, {
      ...newBook,
      id: newId,
      publicationYear: year === "noPublicationYear" ? "" : year,
    });
  };

  const handleCancel = () => {
    setEditingBook(null);
  };

  return (
    <React.Fragment>
      <AddBooks onAddBook={handleAdd} />
      {isLoading ? (
        <React.Fragment>
          <FormControl fullWidth sx={{ mb: "20px" }}>
            <InputLabel>Фильтрация</InputLabel>
            <Select id="demo-simple-select" label="Фильтра" value={filter} onChange={handleFilter}>
              <MenuItem value="rating">По рейтингу</MenuItem>
              <MenuItem value="author">По автору</MenuItem>
              <MenuItem value="">Без фильтров</MenuItem>
            </Select>
          </FormControl>

          <div className={s.booksLists}>
            {Object.keys(books)
              .filter((year) => year !== "noPublicationYear")
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
                      .map((book) => (
                        <div key={book.id} className={s.book}>
                          {editingBook &&
                          editingBook.book.id === book.id &&
                          editingBook.year === year ? (
                            <EditBook
                              book={editingBook.book}
                              onSave={handleSave}
                              onCancel={handleCancel}
                            />
                          ) : (
                            <>
                              <p className={s.nameBook}>{book.name}</p>
                              <img src={img1} alt="book" />
                              <p className={s.author}>{book.author}</p>
                              <p>Рейтинг: {book.rating}/10</p>
                              <p className={s.isbn}>ISBN: {book.isbn}</p>
                              <div className={s.controls}>
                                <MdDelete size={40} onClick={() => handleDelete(year, book.id)} />
                                <MdModeEditOutline
                                  size={40}
                                  onClick={() => handleEdit(year, book)}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                  </Carousel>
                </React.Fragment>
              ))}
            {booksWithoutYear.length > 0 && (
              <React.Fragment>
                <p className={s.dateOfIssue}>Без года</p>
                <Carousel className={s.carousel} responsive={responsive}>
                  {booksWithoutYear.map((book) => (
                    <div key={book.id} className={s.book}>
                      {editingBook && editingBook.book.id === book.id && editingBook.year === "" ? (
                        <EditBook
                          book={editingBook.book}
                          onSave={handleSave}
                          onCancel={handleCancel}
                        />
                      ) : (
                        <>
                          <p className={s.nameBook}>{book.name}</p>
                          <img src={img1} alt="book" />
                          <p className={s.author}>{book.author}</p>
                          <p>Рейтинг: {book.rating}/10</p>
                          <p className={s.isbn}>ISBN: {book.isbn}</p>
                          <div className={s.controls}>
                            <MdDelete size={40} onClick={() => handleDelete("", book.id)} />
                            <MdModeEditOutline size={40} onClick={() => handleEdit("", book)} />
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </Carousel>
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
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
