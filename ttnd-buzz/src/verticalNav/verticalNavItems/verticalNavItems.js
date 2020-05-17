import React from 'react';
import NavbarItem from '../verticalNav';
import styles from './verticalNavItems.module.css';

const Navbar=(props)=>{
    return (
        <ul className={styles.list}>
            <NavbarItem link="/buzz" exact>BUZZ</NavbarItem>
            <NavbarItem link="/complaint">COMPLAINTS</NavbarItem>
            <NavbarItem link="/resolved">RESOLVED</NavbarItem>
        </ul>
    );

}

export default Navbar;