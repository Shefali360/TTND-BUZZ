import React, { Component } from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import Spinner from '../components/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class AuthToken extends Component {
  componentDidMount() {
    this.props.onFetchToken();
    //console.log(this.props.data);
  }

  render(){
    const a=this.props.data&&this.props.data.access_token;
    console.log(a);
    if(a){
      this.props.checkAdmin();

      return <Redirect to ='/buzz'/>
    }else if(this.props.error){
      return <Redirect to ='/login'/>
      };
    return <Spinner/>;
  }
}

const mapStateToProps = (state) => {
  // console.log("recieving", state.auth.token);
  return {
    data: state.auth.token,
    error: state.auth.error,
    admin:state.adminCheck.adminPrivilege
  };
};

const mapDispatchToProps = (dispatch) => {
  // console.log("dispatch", dispatch);
  return {
    onFetchToken: () => dispatch(actions.fetchToken()),
    checkAdmin:()=>dispatch(actions.checkAdmin())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthToken);
