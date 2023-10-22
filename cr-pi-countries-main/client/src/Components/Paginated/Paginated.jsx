import React from 'react';
import { nextPage, prevPage } from '../../Redux/Actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Paginated.module.css'; // Importa el archivo CSS módulo

export default function Paginated({ totalPages }) {
  const { numPage } = useSelector((state) => state);
  const dispatch = useDispatch();

  const nextHandler = () => {
    dispatch(nextPage());
  };

  const prevHandler = () => {
    dispatch(prevPage());
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.pageText}>
        Page: {numPage}/{totalPages}
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