import React, { Component } from "react";
import styles from "./CreateBuzz.module.css";
import sharedStyles from '../../components/Dropdown/Dropdown.module.css';
import Dropdown from "../../components/Dropdown/Dropdown";

class CreateBuzz extends Component {
  render() {
    return (
      <div className={styles.createBuzz}>
          <h4>Create Buzz </h4>
        <form className={styles.form}>
          <textarea
            rows="10"
            cols="50"
            placeholder="Share your thoughts..."
          ></textarea>
          <div className={styles.bottombar}>
            <div>
            <div className={sharedStyles.dropdown}>
            <select name="category">
            <Dropdown value="" optionName="Category"/>
            <Dropdown value="Activity buzz" optionName="Activity"/>
            <Dropdown value="Lost and Found buzz" optionName="Lost and Found"/>
            </select>
            </div>
          <div className={styles.imageUpload}>
          <input type="file" name="images" className={styles.file}/>
          <div className={styles.fakeUpload}>
            <i className="fa fa-image"></i>
            </div>
          </div>
          </div>
          <button className={styles.button} type="submit" value="Submit"><i className="fa fa-play"></i></button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateBuzz;
