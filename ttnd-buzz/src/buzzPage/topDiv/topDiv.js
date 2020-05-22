import React from "react";
import logo from "../../Images/logo.jpeg";
import styles from "./topDiv.module.css";

const topDiv = (props) => {
  return (
    <div className={styles.top}>
      <nav className={styles.navbar}>
       <img src={logo} alt="TTN Logo" />
        <button className={styles.Logout} type="logout" name="logout">
          Logout <i class="fa fa-sign-out"></i>
        </button>
      </nav>
      <div className={styles.topDiv}>
        <div className={styles.innerDiv}>
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default topDiv;
