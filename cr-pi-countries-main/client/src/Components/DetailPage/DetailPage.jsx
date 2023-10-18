import { getCountryDetail, disassembleDetail } from '../../Redux/Actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import styles from './DetailPage.module.css'

export default function Detail() {
   const { id } = useParams();
   const dispatch = useDispatch();
   const countryDetail = useSelector(state => state.countryDetail);

   useEffect(() => {
      dispatch(getCountryDetail(id));
      return () => dispatch(disassembleDetail())
   }, [])

   return (
      <div>
         <div className={styles.title}><h1>COUNTRY DETAIL</h1></div>
         <div className={styles.container}>
            <div className={styles.column}>
               <img src={countryDetail.flag} alt={`${countryDetail.name} Flag`} />
            </div>
            <div className={styles.column2}>
               <h4>Country</h4>
               <h2>{countryDetail.name}</h2>
               <h4>International Code</h4>
               <h2>{countryDetail.id}</h2>
               <h4>Continent</h4>
               <h2>{countryDetail.continent}</h2>
               <h4>Capital</h4>
               <h2>{countryDetail.capital}</h2>
               <h4>Subregion</h4>
               <h2>{countryDetail.subregion}</h2>
               <h4>Area</h4>
               <h2>{countryDetail.area}</h2>
               <h4>Population</h4>
               <h2>{countryDetail.population}</h2>
            </div>
            <div className={styles.column3}>
               <h2>Activities:</h2>
               {countryDetail.Activities ? (
                  <ul>
                     {countryDetail.Activities.map(activity => (
                        <li key={activity.name}>
                           <div>
                              <p><b>Name: {activity.name}</b></p>
                              <p>Difficulty: {activity.difficulty}</p>
                              <p>Duration: {activity.duration} horas</p>
                              <p>Season: {activity.season}</p>
                           </div>
                        </li>
                     ))}
                  </ul>
               ) : (
                  <p>No activities available</p>
               )}

            </div>
         </div>
         <div className={styles.buttonContainer}>
            <button className={styles.backButton}>
               <Link to='/home'>Back</Link>
            </button>
         </div>
      </div>
   )
}