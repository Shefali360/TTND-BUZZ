import React, { Component } from "react";
import styles from "./ComplaintBox.module.css";
import sharedStyles from '../../BuzzPage/CreateBuzz/CreateBuzz.module.css';

class ComplaintBox extends Component {
  render() {
    return (
      <div className={styles.complaintBox}>
        <h4>Complaint Box</h4>
        <form className={styles.complaintForm}>
        <div className={[styles.item,styles.dropdownMenu].join(' ')}> 
          <label>Select Department</label>
          <select className={styles.select} name="department">
            <option className={styles.blank}></option>
            <option value="Admin">Admin</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Infra">Infra</option>
          </select>
          </div>
          <div className={[styles.item,styles.dropdownMenu].join(' ')}>
          <label>Issue Title</label>
          <select className={styles.select} name="issue">
          <option className={styles.blank}></option>
            <option value="Hardware">Hardware</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Others">Others</option>
          </select>
          </div>
          <div className={styles.item}>
          <label>Your Name</label>
          <input className={styles.input}type="text" name="name" readOnly/>
          </div>
          <div className={styles.item}>
          <label >Email Id</label>
          <input className={styles.input}type="email" name="email" readOnly/>
          </div>
          <div className={styles.textarea}> 
          <label>Your Concern</label>
          <textarea className={styles.Textarea} rows="10" cols="50" placeholder="Please write your concern..."></textarea>
          </div>
          <div className={styles.attachment}>
          <div className={[sharedStyles.imageUpload,styles.realimage].join(' ')}>
            <input type="file" name="images" />
            <div className={styles.fakeImage}>
            <i className="fa fa-image"></i>
            </div>
            </div>
        </div>
            <div className={styles.Button}>
          <button className={styles.button} type="submit" value="Submit">
            Submit
          </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ComplaintBox;
