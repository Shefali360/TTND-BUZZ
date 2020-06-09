import * as actionTypes from "./actionTypes";
import axios from "axios";

export const tokenRevoked = (data) => {
  return {
    type: actionTypes.TOKEN_REVOKED
  };
};

export const tokenRevoke= (data) => {
  return {
    type: actionTypes.TOKEN_REVOKE_FAILED
  };
};

export const revokeToken = () => {
const token=JSON.parse(localStorage.getItem("token"));
console.log(token.refresh_token);
  return (dispatch) => {
    axios
      .post(
        'http://localhost:3030/logout',{
        refreshToken:token.refresh_token}
      )
      .then((response) => {
        localStorage.clear();
        console.log(response);
        dispatch(tokenRevoked());
      })
      .catch((error) => {
        dispatch(tokenRevoked());
      });
  };
};


