import React, { useEffect } from 'react';
import styles from './Landing.module.css';
import { Link } from 'react-router-dom';

export default function Landing() {
    useEffect(() => {
        document.body.classList.add('landing-body');
        return () => {
            document.body.classList.remove('landing-body');
        };
    }, []);

    return (
        <div className={styles.Landing}>
            <div className={styles.container}>
                <h1>"PI Countries"</h1>
                <div className={styles.space}></div>
                <Link to="/home">
                    <button>HOME</button>
                </Link>
            </div>
        </div>
    );
}
