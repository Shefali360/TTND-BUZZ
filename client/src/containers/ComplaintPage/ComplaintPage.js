import React, { Component } from "react";
import Complaintbox from './ComplaintBox/ComplaintBox';
import ComplaintsList from "./ComplaintList/ComplaintList";
import axios from 'axios';
import { connect } from "react-redux";
import { errorOccurred } from "../../store/actions/index";

class ComplaintPage extends Component{

  state = {
    userName: '',
    userMail: '',
    complaintSubmitted:{submitted:0}
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
      const errorCode=err.response.data.errorCode;
      if(errorCode==="INVALID_TOKEN"){
         this.props.errorOccurred();
      }
    });
  }

  complaintSubmitted=(event)=>{
    this.setState({complaintSubmitted:event});
  }

  render(){
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

const mapDispatchToProps=(dispatch)=>{
  return{
    errorOccurred:()=>dispatch(errorOccurred())
  }
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(ComplaintPage);
