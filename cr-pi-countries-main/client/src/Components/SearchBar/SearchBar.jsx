import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../../Redux/Actions/actions';
import style from './SearchBar.module.css';

export default function SearchBar({ onSearchResult }) {
   const dispatch = useDispatch();
   const [name, setName] = useState('');

   const handleInputChange = (event) => {
      const searchText = event.target.value.trim().toLowerCase();
      setName(searchText);
      const result = searchText ? dispatch(getCountryByName(searchText)) : [];
      onSearchResult(result); // Llama a la función onSearchResult con el resultado de la búsqueda
   };

   const handleClearClick = () => {
      setName('');
      dispatch(getCountryByName(''));
      onSearchResult([]); // Llama a la función onSearchResult con un array vacío para borrar los resultados de la búsqueda
   };

   return (
      <div>
         <div className={style.catcher}>
            <input
               type="text"
               id="searchInput"
               value={name}
               onChange={handleInputChange}
               placeholder="Search your Country"
               autoComplete="off"
            />
            {name && (
               <button onClick={handleClearClick} style={{ marginLeft: '10px' }}>
                  Reset search
               </button>
            )}
         </div>
      </div>
   );
}


