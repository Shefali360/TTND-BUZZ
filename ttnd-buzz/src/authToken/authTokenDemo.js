import React, { Component } from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

class authToken extends Component {
  componentDidMount() {
    this.props.onFetchToken();
    //console.log(this.props.data);
  }

  render() {
    //console.log(this.props.data);
    // if(this.props.data){
    //   this.props.history.push({
    //     pathname: "/buzz",
    //     // state: {
    //     //   token: this.state.token,
    //     // },
    //   });
    // }else if(this.props.error){
    //   this.props.history.push({
    //     pathname: "/",
    //     // state: {
    //     //   token: this.state.token,
    //     // },
    //   });

    // }

    return <p>Please wait while you are being logged in...</p>;
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
export default connect(mapStateToProps, mapDispatchToProps)(authToken);
