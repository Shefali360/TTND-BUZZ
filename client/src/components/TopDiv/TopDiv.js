import React from "react";
import logo from "../../Images/logo.jpeg";
import styles from "./TopDiv.module.css";
import Logout from '../../Logout/Logout';

const TopDiv = (props) => {
  return (
    <div className={styles.top}>
      <nav className={styles.navbar}>
       <img src={logo} alt="TTN Logo" />
      <Logout/>
      </nav>
      <div className={styles.topDiv}>
        <div className={styles.innerDiv}>
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default TopDiv;
