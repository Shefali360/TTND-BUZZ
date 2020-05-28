import * as actionTypes from "./actionTypes";
import axios from "axios";

export const complaintListReceived = (data) => {
  return {
    type: actionTypes.COMPLAINT_LIST_RECEIVED,
    complaintList: data,
  };
};

export const complaintListFailed = (err) => {
  return {
    type: actionTypes.COMPLAINT_LIST_FAILED,
    error: err,
  };
};

export const fetchComplaintList = () => {
  return (dispatch) => {
    const token=JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        'http://localhost:3030/complaint',{headers:{"authorization":`Bearer ${token.access_token},Bearer ${token.id_token}`}}
      )
      .then((response) => {
        dispatch(complaintListReceived(response.data));
      })
      .catch((error) => {
        dispatch(complaintListFailed(error));
      });
  };
};
