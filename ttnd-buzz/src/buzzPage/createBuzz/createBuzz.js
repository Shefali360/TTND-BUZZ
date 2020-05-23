import React, { Component } from "react";
import styles from "./createBuzz.module.css";

class createBuzz extends Component {
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
          <div className={styles.dropdown}>
          <select name="category">
            <option value="" defaultValue>Category</option>
            <option value="Activity buzz">Activity</option>
            <option value="Lost and Found buzz">Lost and Found</option>
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

export default createBuzz;
