import React from 'react';
import NavbarItem from '../sideBarItem';
import styles from './sideBarItems.module.css';
import Footer from '../footer/footer';
import Aux from '../../../hoc/wrap/wrap';

const Navbar=(props)=>{
    return (
        <Aux>
        <ul className={styles.list}>
            <NavbarItem link="/buzz" exact>BUZZ</NavbarItem>
            <NavbarItem link="/complaint">COMPLAINTS</NavbarItem>
            <NavbarItem link="/resolved">RESOLVED</NavbarItem>
        </ul>
        <Footer/>
        </Aux>
    );

}

export default Navbar;