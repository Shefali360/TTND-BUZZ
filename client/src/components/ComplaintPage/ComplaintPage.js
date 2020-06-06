import React, { Component } from "react";
import Complaintbox from '../../containers/ComplaintBox/ComplaintBox';
import ComplaintsList from "../../containers/ComplaintList/ComplaintList";
import axios from 'axios';

class ComplaintPage extends Component{

  state = {
    userName: '',
    userMail: ''
  }

  componentDidMount() {
    const token=JSON.parse(localStorage.getItem("token"));
    axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token.id_token}`)
    .then(res => {
      this.setState({
        userName: res.data.name,
        userMail: res.data.email
      });
    })
  }

  render(){
    return (
      <div>
        <Complaintbox name={this.state.userName} mail={this.state.userMail} />
        <ComplaintsList/>
      </div>
    );
  }
}

export default ComplaintPage;
