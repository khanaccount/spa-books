import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBEl8mSE0S50j12KE9K25OfjQFzLTJY9do",
  authDomain: "books-68fe9.firebaseapp.com",
  databaseURL: "https://books-68fe9-default-rtdb.firebaseio.com/",
  projectId: "books-68fe9",
  storageBucket: "books-68fe9.appspot.com",
  messagingSenderId: "381727631452",
  appId: "1:381727631452:web:bc103d5772890776415e99",
  measurementId: "G-HS6EY6QEGB",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
