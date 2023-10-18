import NavBar from '../../Components/NavBar/NavBar'
import Cards from '../../Components/Cards/Cards'
import style from './Home.module.css'

export default function home() {
    return (
        <div className={style.homeContainer}>
            <h1>PI  COUNTRIES</h1>
            <NavBar />
            <Cards />
        </div>
    )
}