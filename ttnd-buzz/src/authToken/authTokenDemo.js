import React, { Component } from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

class authToken extends Component {
    state={
        token:null,
        error:false
    }
  componentDidMount() {
     this.props.onFetchToken();
  }
  render() {
    
    return <p>Please wait while you are being logged in...</p>;
  }
}

// const mapStateToProps=(state)=>{
//     return{
//         data:state.token.data,
//         error:state.token.error
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
      onFetchToken: () => dispatch(actions.fetchToken())
    };
  };
  export default connect(null, mapDispatchToProps)(authToken);
  


