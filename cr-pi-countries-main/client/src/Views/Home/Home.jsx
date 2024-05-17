import React from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Sorting from '../../Components/Sorting/Sorting';
import Filters from '../../Components/Filters/Filters';
import Paginated from '../../Components/Paginated/Paginated';
import Cards from '../../Components/Cards/Cards';
import style from './Home.module.css';

export default function Home() {
  const totalPages = 10;

  return (
    <div className={style.homeContainer}>
      <NavBar />
      <div className={style.content}>
        <div className={style.filterSortContainer}>
          <Sorting />
          <Filters />
        </div>
        <Cards />
        <Paginated totalPages={totalPages} />
      </div>
    </div>
  );
}
