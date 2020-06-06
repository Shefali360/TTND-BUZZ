import * as actionTypes from "./actionTypes";
import axios from "axios";

export const buzzReceived = (data) => {
  return {
    type: actionTypes.BUZZ_RECEIVED,
    buzz: data,
  };
};

export const buzzFailed = (err) => {
  return {
    type: actionTypes.BUZZ_FAILED,
    error: err,
  };
};

export const fetchBuzz= (skip, limit) => {
  console.log("getBuzzzAction", skip, limit);
  return (dispatch) => {
    const token=JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        `http://localhost:3030/buzz`, {headers:{"authorization":`Bearer ${token.access_token},null`}}
      )
      .then((response) => {
        // response.data['skip'] = skip + 5;
        // response.data['hasMore'] = !(response.data.buzz.length < limit);
        dispatch(buzzReceived(response.data));
      })
      .catch((error) => {
        dispatch(buzzFailed(error));
      });
  };
};
