import React, { Component } from "react";
import styles from "./ComplaintBox.module.css";
import axios from 'axios';
import { connect } from "react-redux";
import SmallSpinner from "../../../components/SmallSpinner/SmallSpinner";
import { Redirect } from "react-router-dom";

class ComplaintBox extends Component{
state = {
    department: "",
    issue: "",
    concern:"",
    files:[],
    submitDisabled: true,
    error: false,
    formSubmitted:false,
    spinner:false,
    departmentEmpty: false,
    issueEmpty:false,
    concernEmpty:false,
    networkErr:false,
    redirect:false
  }; 
  counter=0;
  mounted=false;

  fileChange=(event)=>{
    this.mounted && this.setState({files:event.target.files});
  }

  handleChange = (event) => {
    this.mounted && this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (this.state.department !== "" && this.state.issue !== "" && this.state.concern !== "")
          this.mounted && this.setState({ submitDisabled: false,departmentEmpty:false,issueEmpty:false,concernEmpty:false });
          if (this.state.department === "")
          { this.mounted &&this.setState({ departmentEmpty:true });}
          if (this.state.issue === "")
          { this.mounted &&this.setState({ issueEmpty:true });}
          if (this.state.concern === "")
          { this.mounted &&this.setState({ concernEmpty:true });}
      }
    );
  };

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  submitHandler = (event) => {
    event.preventDefault();

    let formData=new FormData();
    for(let i=0;i<this.state.files.length;i++){
        formData.append("files",this.state.files[i],this.state.files[i]["name"])
    }
    formData.append("department",this.state.department);
    formData.append("issue",this.state.issue);
    formData.append("concern",this.state.concern);
    this.mounted &&this.setState({spinner:true});
    axios
      .post("http://localhost:3030/complaint",formData,{
        headers:{
          authorization:`Bearer ${this.props.data.access_token},Bearer ${this.props.data.id_token}`
        }
      })
      .then((res) => {
        this.props.submitted({submitted:++this.counter});
        this.mounted && this.setState({
          department: '',
          issue: '',
          formSubmitted: true,
          submitDisabled: true,
          concern: '',
          files: [],
          spinner:false
        });
        this.handle = setTimeout(() => {this.mounted && this.setState({formSubmitted: false});}, 1000);
      })
      .catch((err) => {
        if(err.response.status===401){
          this.mounted &&this.setState({redirect:true});
        }
        if(err.response.status===500){
          this.mounted &&this.setState({networkErr:true});
        }
      });

  };

  render() {
    if(this.state.redirect){
      alert("Timed out!Please login again.")
      return <Redirect to='/login'/>
    }else{ return (
      <div className={styles.complaintBox}>
         {(this.state.networkErr)?alert("Please check your internet connection"):null}
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
          <input className={[styles.input,styles.readOnly].join(' ')}type="text" name="name" value={this.props.name || ''} readOnly/>
          </div>
          <div className={styles.item}>
          <label >Email Id</label>
          <input className={[styles.input,styles.readOnly].join(' ')}type="email" name="email" value={this.props.mail || ''} readOnly/>
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
            {(this.state.spinner)?<div className={styles.spinner}><SmallSpinner/></div>:null}
            {(this.state.departmentEmpty||(this.state.issueEmpty)||(this.state.concernEmpty))?<p className={styles.errormsg}>Please fill in all the fields.</p>:null}
          <button className={styles.button} type="submit" value="Submit"
          disabled={this.state.submitDisabled}
          onClick={(event) => {
            this.submitHandler(event);
          }}>
            Submit
          </button>
          </div>
          <div className={styles.message}>
            {(this.state.formSubmitted)?<p>Successful!</p>:null}
          </div>
        </form>
      </div>
    );
  }
}
}

const mapStateToProps = (state) => {
  return {
    data: state.auth.token,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getComplaintsList:()=>dispatch(actions.fetchComplaintList())
//   };
// };

export default connect(mapStateToProps)(ComplaintBox);
