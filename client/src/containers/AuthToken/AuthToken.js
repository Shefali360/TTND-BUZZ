import React, { Component } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from '../../components/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class AuthToken extends Component {
  componentDidMount() {
    this.props.onFetchToken();
  }

  render(){
    const a=this.props.data&&this.props.data.access_token;
    // const now=Date.now();
    // console.log(now);
    if(a){
      // const expiryDate=now + 3.6e6;
      // console.log(expiryDate);
      this.props.checkAdmin();
      // if(now===expiryDate){
      //   console.log("true");
      //   return <Redirect to ='/login'/>
      // }else if(now!==expiryDate){
      //     console.log("false");
      // }
       return <Redirect to ='/buzz'/>
    }else if(this.props.error){
      return <Redirect to ='/login'/>
      }
    return <Spinner/>;
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.auth.token,
    error: state.auth.error,
    admin:state.adminCheck.adminPrivilege
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchToken: () => dispatch(actions.fetchToken()),
    checkAdmin:()=>dispatch(actions.checkAdmin())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthToken);
