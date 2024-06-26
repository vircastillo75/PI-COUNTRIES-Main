// NavBar.js
import React from 'react';
import style from './NavBar.module.css';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

export default function NavBar() {
  return (
    <div className={style.container}>
      <SearchBar />
      <button className={style.navButton}>
        <Link to='/form'>Create Activity</Link>
      </button>
      <button className={style.navButton}>
        <Link to='/'>Landing</Link>
      </button>
      <button className={style.navButton}>
        <Link to='/about'>About</Link>
      </button>
    </div>
  );
}
