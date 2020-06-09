import React, { Component } from "react";
import Complaintbox from '../../containers/ComplaintBox/ComplaintBox';
import ComplaintsList from "../../containers/ComplaintList/ComplaintList";
import axios from 'axios';
import { connect } from "react-redux";

class ComplaintPage extends Component{

  state = {
    userName: '',
    userMail: '',
    complaintSubmitted:{submitted:0}
  }

  mounted = false;

  componentDidMount() {
    this.mounted = true;
    axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${this.props.data.id_token}`)
    .then(res => {
      this.setState({
        userName: res.data.name,
        userMail: res.data.email
      });
    })
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateState(arg) {
    this.mounted && this.setState(arg);
  }

  complaintSubmitted=(event)=>{
    this.updateState({complaintSubmitted:event});
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

export default connect(mapStateToProps)(ComplaintPage);
