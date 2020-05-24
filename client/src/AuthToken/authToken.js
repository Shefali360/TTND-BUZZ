import React, { Component } from "react";
import * as queryString from 'query-string';
import axios from "axios";


class authToken extends Component {

    state={
        token:null,
        error:false
    }
  componentDidMount() {
    const urlParams = queryString.parse(window.location.search);
    axios
      .get(`http://localhost:3030/authToken/${encodeURIComponent(urlParams.code)}`)
      .then((res) => {
        if (res.data.access_token) {
          this.setState({ token: res.data.access_token });
          console.log(res);
          this.props.history.push({
            pathname: "/buzz",
            // state: {
            //   token: this.state.token,
            // },
          });
        } else {
          this.setState({ error: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    
    return <p>Please wait while you are being logged in...</p>;
  }
}


export default authToken;
