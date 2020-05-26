import * as actionTypes from "./actionTypes";
import axios from "axios";

export const refreshedTokenReceived = (data) => {
  return {
    type: actionTypes.REFRESHED_TOKEN_RECEIVED,
    data:data
  };
};

export const refreshedTokenFailed = (err) => {
  return {
    type: actionTypes.REFRESHED_TOKEN_FAILED,
    error: err,
  };
};

export const tokenRefresh = () => {
const token=JSON.parse(localStorage.getItem("token"));
console.log(token.refresh_token);
  return (dispatch) => {
    axios
      .post(
        'http://localhost:3030/refreshAuthToken',{
        refreshToken:token.refresh_token}
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("token.refresh_token",response.data.refreshToken);
        dispatch(refreshedTokenReceived(response.data));
      })
      .catch((error) => {
        dispatch(refreshedTokenFailed(error));
      });
  };
};


