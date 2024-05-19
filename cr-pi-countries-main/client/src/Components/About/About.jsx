// About.js
import React from 'react';
import styles from './About.module.css';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <h1 className={styles.tittle}>About me</h1>
        <div className={styles.content}>
          <div className={styles.containerText}>
            <h2 className={styles.subtittle}>My name is Maria Virginia Castillo</h2>
            <p className={styles.description}>
              I have a degree in International Relations and I am a lawyer. I am finishing the Full Stack Developer course at SoyHenry. This is my personal project about country information and the creation of activities that can be developed in one or more of them.
            </p>
            <div className={styles.buttonContainer}>
              <Link to="/home">
                <button>HOME</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
