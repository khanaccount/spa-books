import React, { useState } from "react";
import s from "./index.module.scss";

interface Book {
  name: string;
  author: string;
  rating: number | string;
  isbn: string;
  publicationYear: number | string;
  id: number;
}

interface AddBooksProps {
  onAddBook: (newBook: Book) => void;
}

const AddBooks: React.FC<AddBooksProps> = ({ onAddBook }) => {
  const [name, setName] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [rating, setRating] = useState<number | string>("");
  const [isbn, setIsbn] = useState<string>("");
  const [publicationYear, setPublicationYear] = useState<number | string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleAdd = () => {
    const newBook: Book = {
      name: name,
      author: author,
      rating: rating,
      isbn: isbn,
      publicationYear: publicationYear === "" ? "" : parseInt(publicationYear as string),
      id: 0,
    };

    onAddBook(newBook);

    setName("");
    setAuthor("");
    setRating("");
    setIsbn("");
    setPublicationYear("");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    checkFormValidity();
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
    checkFormValidity();
  };

  const checkFormValidity = () => {
    if (name.trim() !== "" && author.trim() !== "") {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <div className={s.addBooks}>
      <h1>Добавление Книги</h1>
      <input type="text" value={name} onChange={handleNameChange} placeholder="Название" required />
      <input
        type="text"
        value={author}
        onChange={handleAuthorChange}
        placeholder="Автор"
        required
      />
      <select value={rating} onChange={(e) => setRating(e.target.value)} required>
        <option value="" disabled>
          Выберите рейтинг
        </option>
        {[...Array(10).keys()].map((value) => (
          <option key={value + 1} value={value + 1}>
            {value + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        placeholder="ISBN"
      />
      <input
        type="number"
        value={publicationYear}
        onChange={(e) => setPublicationYear(e.target.value)}
        placeholder="Дата публикации"
        required
      />
      {isFormValid ? (
        <button className={s.saveBtn} onClick={handleAdd}>
          Сохранить
        </button>
      ) : (
        <button className={s.unActiveBtn}>Заполните все нужные поля</button>
      )}
    </div>
  );
};

export default AddBooks;
