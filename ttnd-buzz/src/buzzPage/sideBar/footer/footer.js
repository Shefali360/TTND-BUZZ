import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './footer.module.css';
const footer=(props)=>{
    return(
        <div className={styles.footer}>
        <p> &#169; 2020 To The New Digital</p>
        <div className={styles.links}>
        <NavLink className={styles.link} to="/about">About</NavLink>
        <NavLink className={styles.link} to="/help">Help</NavLink>
        </div>
        </div>
    );
}

export default footer;