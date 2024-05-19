import React from 'react';
import { nextPage, prevPage } from '../../Redux/Actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Paginated.module.css';

export default function Paginated() {
  const { numPage, allCountriesCopy } = useSelector((state) => state);
  const dispatch = useDispatch();

  const itemsPerPage = 10; // Establecer itemsPerPage en 10

  const totalCount = allCountriesCopy.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const nextHandler = () => {
    if (numPage < totalPages) {
      dispatch(nextPage());
    }
  };

  const prevHandler = () => {
    if (numPage > 1) {
      dispatch(prevPage());
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  // Si el número de elementos es menor que el número de páginas necesarias
  // Solo mostramos el número de páginas ocupadas por los elementos
  const pagesToShow = Math.min(numPage, totalPages);

  return (
    <div className={styles.container}>
      <h3 className={styles.pageText}>
        Page: {pagesToShow}/{totalPages}
      </h3>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${numPage === 1 ? styles.disabled : ''}`}
          onClick={prevHandler}
          disabled={numPage === 1}
        >
          Prev
        </button>
        <button
          className={`${styles.button} ${numPage === totalPages ? styles.disabled : ''}`}
          onClick={nextHandler}
          disabled={numPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
