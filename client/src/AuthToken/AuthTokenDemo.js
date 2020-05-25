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
      return <Redirect to ='/buzz'/>
    }else if(this.props.error){
      return <Redirect to ='/buzz'/>
      };
    return <Spinner/>;
  }
}

const mapStateToProps = (state) => {
  console.log("recieving", state.token.token);
  return {
    data: state.token.token,
    error: state.token.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("dispatch", dispatch);
  return {
    onFetchToken: () => dispatch(actions.fetchToken()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthToken);
