import React, { Component } from "react";
import styles from "./CreateBuzz.module.css";
import sharedStyles from "../../components/Dropdown/Dropdown.module.css";
import Dropdown from "../../components/Dropdown/Dropdown";
import { connect } from "react-redux";
import axios from "axios";

class CreateBuzz extends Component {
  state = {
    description: "",
    category: "",
    images:[],
    submitDisabled: true,
    error: false,
  };

  fileChange=(event)=>{
    this.setState({images:event.target.files});
    console.log(this.state.images);
  }

  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (this.state.description !== "" && this.state.category !== "")
          this.setState({ submitDisabled: false });
        // console.log(this.state.description);
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
    // const buzzObject = {
    //   description: this.state.description,
    //   category: this.state.category,
    //   images:this.state.images
    // };

    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    axios
      .post("http://localhost:3030/buzz",formData,{
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
      <div className={styles.createBuzz}>
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
                <select
                  name="category"
                  value={this.state.category}
                  onChange={this.handleChange}
                >
                  <Dropdown value="" optionName="Category" />
                  <Dropdown value="Activity buzz" optionName="Activity" />
                  <Dropdown
                    value="Lost and Found buzz"
                    optionName="Lost and Found"
                  />
                </select>
              </div>
              <div className={styles.imageUpload}>
                <input type="file" name="images" className={styles.file} accept="image/x-png,image/jpg,image/jpeg" onChange={this.fileChange} multiple/>
                <div className={styles.fakeUpload}>
                  <i className="fa fa-image"></i>
                </div>
              </div>
            </div>
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
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.auth.token,
  };
};

export default connect(mapStateToProps)(CreateBuzz);


