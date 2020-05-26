import React from 'react';
import styles from './NotFound.module.css';

const NotFound = () =>{
 return( 
<div className={styles.notfound}>
    <h3>404 page not found</h3>
    <p>We are sorry but the page you are looking for does not exist.</p>
</div>);
}

export default NotFound;