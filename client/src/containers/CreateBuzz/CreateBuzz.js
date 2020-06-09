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
    formSubmitted:false,
    files: null
  };

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
          this.setState({ submitDisabled: false });
        
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
    // const token = JSON.parse(localStorage.getItem("token"));
    // console.log(token);
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
          images: []
        });
        setTimeout(() => {this.setState({formSubmitted: false});}, 1000);
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

const mapStateToProps = (state) => {
  return {
    data: state.auth.token,
  };
};

// const mapDispatchToProps=(dispatch)=>{
//   return{
//     getRecentBuzz: () => dispatch(actions.fetchBuzz())
//   }
// }

export default connect(mapStateToProps)(CreateBuzz);


