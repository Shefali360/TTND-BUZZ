import * as actionTypes from "./actionTypes";
import axios from "axios";

export const buzzReceived = (data) => {
  return {
    type: actionTypes.BUZZ_RECEIVED,
    data: data,
  };
};

export const buzzFailed = (err) => {
  return {
    type: actionTypes.BUZZ_FAILED,
    error: err,
  };
};

export const fetchBuzz= () => {
  return (dispatch) => {
    axios
      .get(
        'http://localhost:3030/buzz',{headers:{"authorization":`Bearer ${token.access_token},Bearer ${token.id_token}`}}
      )
      .then((response) => {
        console.log(response.data);
        dispatch(buzzReceived(response.data));
      })
      .catch((error) => {
        dispatch(buzzFailed(error));
      });
  };
};
