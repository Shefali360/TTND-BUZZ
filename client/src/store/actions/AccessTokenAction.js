import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as queryString from "query-string";

export const tokenReceived = (data) => {
  return {
    type: actionTypes.TOKEN_RECEIVED,
    data: data,
  };
};

export const tokenReceiveFailed = (err) => {
  return {
    type: actionTypes.TOKEN_RECEIVE_FAILED,
    error: err,
  };
};

export const fetchToken = () => {
  if(window.location.pathname==="/authToken"){
  const urlParams = queryString.parse(window.location.search);
  return (dispatch) => {
    axios
      .get(
        `http://localhost:3030/authToken/${encodeURIComponent(urlParams.code)}`
      )
      .then((response) => {
        // const expirationDate = new Date(
        //   new Date().getTime() + response.data.expires_in * 1000
        // );
        localStorage.setItem("token",JSON.stringify(response.data));
        dispatch(tokenReceived(response.data));
      })
      .catch((error) => {
        dispatch(tokenReceiveFailed(error));
      });
  };
}else{
  const token=JSON.parse(localStorage.getItem("token"));
  return(dispatch)=>{
  if(token){
  dispatch(tokenReceived(token));
  }else{
    dispatch(tokenReceiveFailed("Error"));
  }}
}
};


