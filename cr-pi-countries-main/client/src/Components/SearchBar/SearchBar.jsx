import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName, setNumPage } from '../../Redux/Actions/actions'
import style from './SearchBar.module.css';

export default function SearchBar() {
   const dispatch = useDispatch();
   const [name, setName] = useState('');

   const handlePageChange = () => {
      dispatch(setNumPage(1));
   }

   const handleInputChange = (event) => {
      const searchText = event.target.value.trim().toLowerCase(); // Elimina espacios al principio y al final y convierte a minúsculas
      setName(searchText);
      dispatch(getCountryByName(searchText));
      handlePageChange(1);
   };

   const handleClearClick = () => {
      setName('');
      dispatch(getCountryByName(''));
      handlePageChange(1);
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
