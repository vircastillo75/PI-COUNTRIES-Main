// Filters.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredCountries, getAllActivities, getAllCountriesWithActivities, setNumPage } from '../../Redux/Actions/actions';
import styles from './Filters.module.css';

const continentOptions = [
  { value: 'All', label: 'All Continents' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Antarctica', label: 'Antarctica' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'North America', label: 'North America' },
  { value: 'South America', label: 'South America' },
  { value: 'Oceania', label: 'Oceania' }
];

export default function Filters() {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.allCountries);
  const allActivities = useSelector(state => state.allActivities);

  const handlePageChange = () => {
    dispatch(setNumPage(1));
  }

  const handleFilterContinent = (event) => {
    const selectedContinent = event.target.value;
    if (selectedContinent === 'All') {
      dispatch(setFilteredCountries(countries));
    } else {
      const filtered = countries.filter(country => country.continent === selectedContinent);
      dispatch(setFilteredCountries(filtered));
    }
    handlePageChange();
  }

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  const handleAllCountriesWithActivities = (event) => {
    const selectedActivity = event.target.value;
    dispatch(getAllCountriesWithActivities(selectedActivity));
    handlePageChange();
  }

  const handleResetFilters = () => {
    dispatch(setFilteredCountries(countries));
    dispatch(setNumPage(1));

    document.querySelector('select[name="continent"]').value = 'All';
    document.querySelector('select[name="activity"]').value = 'All';
  }

  let values = Array.isArray(allActivities) ? allActivities.map(name => name.name) : [];
  const onlyValues = [...new Set(values)];

  return (
    <div className={styles.container}>
      <h4>Filters: </h4>
      <select
        onChange={handleFilterContinent}
        title='Click here to filter by continent'
        name="continent"
      >
        {continentOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        onChange={handleAllCountriesWithActivities}
        title="Select your Activity"
        name="activity"
      >
        <option key="All" value="All">All Activities</option>
        {onlyValues.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <button onClick={handleResetFilters}>Reset Filters</button>
    </div>
  )
}
