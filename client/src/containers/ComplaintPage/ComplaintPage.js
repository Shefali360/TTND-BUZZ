import React, { Component } from "react";
import Complaintbox from './ComplaintBox/ComplaintBox';
import ComplaintsList from "./ComplaintList/ComplaintList";
import axios from 'axios';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class ComplaintPage extends Component{

  state = {
    userName: '',
    userMail: '',
    complaintSubmitted:{submitted:0},
    redirect:false
  }

  componentDidMount() {
    axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${this.props.data.id_token}`)
    .then(res => {
    this.setState({
        userName: res.data.name,
        userMail: res.data.email
      });
    })
    .catch((err) => {
      // console.log(err.message);
      // if(err.response.status===400){
      //   this.setState({redirect:true});
      // }
    });
  }

  complaintSubmitted=(event)=>{
    this.setState({complaintSubmitted:event});
  }

  render(){
    if(this.state.redirect){
      alert("Timed out!Please login again.")
      return <Redirect to='/login'/>
    }else
    return (
      <div>
         
        <Complaintbox name={this.state.userName} mail={this.state.userMail}  submitted={this.complaintSubmitted} />
        <ComplaintsList submitted={this.state.complaintSubmitted}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.auth.token,
  };
};

export default connect(mapStateToProps)(ComplaintPage);
