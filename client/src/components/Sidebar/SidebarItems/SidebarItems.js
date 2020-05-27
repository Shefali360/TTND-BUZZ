import React from 'react';
import NavbarItem from '../SidebarItem';
import styles from './SidebarItems.module.css';
import Footer from '../../Footer/Footer';
import Aux from '../../../hoc/wrap/wrap';
import { connect } from "react-redux";
const isAdmin=JSON.parse(localStorage.getItem("adminPrivilege"));
const Navbar=(props)=>{
    return (
        <Aux>
        <ul className={styles.list}>
            <NavbarItem link="/buzz" >BUZZ</NavbarItem>
            <NavbarItem link="/complaint">COMPLAINTS</NavbarItem>
            {(props.admin||isAdmin)?<NavbarItem link="/resolved">RESOLVED</NavbarItem>:null}
        </ul>
        <Footer/>
        </Aux>
    );

}

const mapStateToProps = (state) => {
    
    return {
        admin:state.adminCheck.adminPrivilege
    }
};

export default connect(mapStateToProps)(Navbar);