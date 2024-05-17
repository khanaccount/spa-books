import React, { useState } from "react";
import { Book } from "../../../types";
import s from "./index.module.scss";

interface EditBookFormProps {
  book: Book;
  onSave: (updatedBook: Book) => void;
  onCancel: () => void;
}

const EditBookForm: React.FC<EditBookFormProps> = ({ book, onSave, onCancel }) => {
  const [author, setAuthor] = useState<string>(book.author);
  const [rating, setRating] = useState<string>(book.rating.toString());
  const [isbn, setIsbn] = useState<string>(book.isbn || "");

  const handleSave = () => {
    const updatedBook = {
      ...book,
      author,
      rating: Number(rating),
      isbn,
    };
    onSave(updatedBook);
  };

  return (
    <div className={s.editForm}>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Автор"
        required
      />
      <input
        type="number"
        value={rating}
        max={10}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Рейтинг"
        required
      />
      <input
        type="text"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        placeholder="ISBN"
      />
      <button onClick={handleSave}>Сохранить</button>
      <button onClick={onCancel}>Отмена</button>
    </div>
  );
};

export default EditBookForm;
