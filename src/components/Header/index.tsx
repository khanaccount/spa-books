import React from "react";
import s from "./index.module.scss";

import logo from "/img/logo.png";

const Header: React.FC = () => {
  return (
    <header className={s.container}>
      <div className={s.header}>
        <a href="/" className={s.nameBlock}>
          <img src={logo} alt="logo" />
          <p className={s.siteName}>Каталог Книг</p>
        </a>
      </div>
    </header>
  );
};

export default Header;
