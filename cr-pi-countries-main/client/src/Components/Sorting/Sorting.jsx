// Sorting.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOption, setFilteredCountries, setNumPage } from '../../Redux/Actions/actions';
import styles from './Sorting.module.css';

const sortingOptions = [
  { value: 'ASC', label: 'A - Z (by name)' },
  { value: 'DESC', label: 'Z - A (by name)' },
  { value: 'MORE', label: '0 - 9 (by population)' },
  { value: 'LESS', label: '9 - 0 (by population)' }
];

export default function Sorting() {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.allCountriesCopy);

  const handleSortChange = (sortOption) => {
    let sortedCountries = [...countries];

    if (sortOption === 'ASC') {
      sortedCountries.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'DESC') {
      sortedCountries.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'MORE') {
      sortedCountries.sort((a, b) => a.population - b.population);
    } else if (sortOption === 'LESS') {
      sortedCountries.sort((a, b) => b.population - a.population);
    }

    dispatch(setSortOption(sortOption));
    dispatch(setFilteredCountries(sortedCountries));
    dispatch(setNumPage(1));
  };

  const handleReset = () => {
    dispatch(setSortOption(''));
    dispatch(setFilteredCountries(countries));
    dispatch(setNumPage(1));
  };

  return (
    <div className={styles.container}>
      <h4>Sorting</h4>
      {sortingOptions.map(option => (
        <button
          key={option.value}
          onClick={() => handleSortChange(option.value)}
          value={option.value}
        >
          {option.label}
        </button>
      ))}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
