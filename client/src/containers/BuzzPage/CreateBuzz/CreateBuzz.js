import React, { Component } from "react";
import styles from "./CreateBuzz.module.css";
import sharedStyles from "../../../components/Dropdown/Dropdown.module.css";
import { connect } from "react-redux";
import axios from "axios";
import SmallSpinner from '../../../components/SmallSpinner/SmallSpinner';
import { Redirect } from "react-router-dom";
import Dropdown from '../../../components/Dropdown/Dropdown';

class CreateBuzz extends Component {
  state = {
    description: "",
    category: "",
    images:[],
    submitDisabled: true,
    error: false,
    formSubmitted:false,
    files: null,
    spinner:false,
    descEmpty:false,
    categoryEmpty:false,
    networkErr:false,
    redirect:false
  };

  array=[{value:"",name:"Category"},{value:"Activity buzz",name:"Activity"},{value:"Lost and Found buzz",name:"Lost and Found"}]

  counter=0;

  fileChange=(event)=>{
    this.setState({images:event.target.files});
  }

  handleChange = (event) => {
     this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (this.state.description !== "" && this.state.category !== "")
         { this.setState({ submitDisabled: false,descEmpty:false,categoryEmpty:false});}
         if (this.state.description === "")
         { this.setState({ descEmpty:true });}
         if (this.state.category === "")
         { this.setState({ categoryEmpty:true });}
      }
    );
  };

  submitHandler = (event) => {

    event.preventDefault();
    let formData=new FormData();
    for(let i=0;i<this.state.images.length;i++){
        formData.append("images",this.state.images[i],this.state.images[i]["name"])
    }
    formData.append("description",this.state.description);
    formData.append("category",this.state.category);
    this.setState({spinner:true});

    axios
      .post("http://localhost:3030/buzz",formData,{
        headers:{
          authorization:`Bearer ${this.props.data.access_token},Bearer ${this.props.data.id_token}`
        },
      })
      .then((res) => {
        this.props.submitted({submitted:++this.counter});
        this.setState({
          description: '',
          category: '',
          formSubmitted: true,
          submitDisabled: true,
          files: null,
          images: [],
          spinner:false
        });
        setTimeout(() => {this.setState({formSubmitted: false});}, 1000);
      })
      .catch((err) => { 
         this.setState({spinner:false});
        if(err.response.status===401){
          this.setState({redirect:true});
        }
        if(err.response.status===500){
          this.setState({networkErr:true});
        }
       
      });
  };
  render() {
    if(this.state.redirect){
      alert("Timed out!Please login again.")
      return <Redirect to='/login'/>
    }else{
    return (
      <div className={styles.createBuzz}>
         {(this.state.networkErr)?alert("Please check your internet connection"):null}
        <h4>Create Buzz </h4>
        <form className={styles.form}>
          <textarea
            rows="10"
            cols="50"
            placeholder="Share your thoughts..."
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          ></textarea>
          <div className={styles.bottombar}>
            <div>
              <div className={sharedStyles.dropdown}>
                <Dropdown name="category" value={this.state.category} change={this.handleChange}
                array={this.array}/>
              </div>
              <div className={styles.imageUpload}>
                <input files={this.state.files} type="file" name="images" className={styles.file} accept="image/x-png,image/jpg,image/jpeg" onChange={this.fileChange} multiple/>
                <div className={styles.fakeUpload}>
                  <i className="fa fa-image"></i>
                </div>
              </div>
            </div>
            <div className={styles.bottombarRight}>
            <div className={styles.submitted}>
            {(this.state.formSubmitted)?<i className="fa fa-check"/>:null}
            </div>
            {(this.state.descEmpty)?<p className={styles.errormsg}>Please fill in the description.</p>:null}
            {(this.state.categoryEmpty)?<p className={styles.errormsg}>Please fill in the category.</p>:null}
            {(this.state.spinner)?<SmallSpinner/>:null}
            <button
              className={styles.button}
              type="submit"
              value="Submit"
              disabled={this.state.submitDisabled}
              onClick={(event) => {
                this.submitHandler(event);
              }}
            >
              <i className="fa fa-play"></i>
            </button>
            </div>
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


export default connect(mapStateToProps)(CreateBuzz);


