import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './verticalNav.module.css';
import Aux from '../hoc/wrap/wrap';

const NavbarItem=(props)=>{
    return(<Aux><li className={styles.listItem}>
        <NavLink className={styles.element} to={props.link} exact={props.exact}
        activeClassName={styles.active}
       >{props.children}
        </NavLink><i className={[styles.arrow,styles.right].join(' ')}></i></li></Aux>);
}

export default NavbarItem;
