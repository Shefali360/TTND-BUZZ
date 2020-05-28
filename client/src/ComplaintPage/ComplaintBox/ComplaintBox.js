import React, { Component } from "react";
import styles from "./ComplaintBox.module.css";
import axios from 'axios';

class ComplaintBox extends Component{
state = {
    department: "",
    issue: "",
    concern:"",
    files:[],
    submitDisabled: true,
    error: false,
  };

  fileChange=(event)=>{
    this.setState({files:event.target.files});
  }

  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (this.state.department !== "" && this.state.issue !== "" && this.state.concern !== "")
          this.setState({ submitDisabled: false });
      }
    );
  };

  submitHandler = (event) => {
    event.preventDefault();

    let formData=new FormData();
    for(let i=0;i<this.state.files.length;i++){
        formData.append("files",this.state.files[i],this.state.files[i]["name"])
    }
    formData.append("department",this.state.department);
    formData.append("issue",this.state.issue);
    formData.append("concern",this.state.concern);
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    axios
      .post("http://localhost:3030/complaint",formData,{
        headers:{
          authorization:`Bearer ${token.access_token},Bearer ${token.id_token}`
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className={styles.complaintBox}>
        <h4>Complaint Box</h4>
        <form className={styles.complaintForm}>
        <div className={[styles.item,styles.dropdownMenu].join(' ')}> 
          <label>Select Department</label>
          <select className={styles.select} name="department" value={this.state.department} onChange={this.handleChange}>
            <option className={styles.blank}></option>
            <option value="Admin">Admin</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Infra">Infra</option>
          </select>
          </div>
          <div className={[styles.item,styles.dropdownMenu].join(' ')}>
          <label>Issue Title</label>
          <select className={styles.select} name="issue" value={this.state.issue} onChange={this.handleChange}>
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
          <textarea className={styles.Textarea} name="concern" rows="10" cols="50" placeholder="Please write your concern..."
          value={this.state.concern} onChange={this.handleChange}></textarea>
          </div>
          <div className={styles.attachment}>
          <div className={styles.realimage}>
            <input type="file" name="files" onChange={this.fileChange} multiple />
            <div className={styles.fakeImage}>
            <i className="fa fa-image"></i>
            </div>
            </div>
        </div>
            <div className={styles.Button}>
          <button className={styles.button} type="submit" value="Submit"
          disabled={this.state.submitDisabled}
          onClick={(event) => {
            this.submitHandler(event);
          }}>
            Submit
          </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ComplaintBox;
