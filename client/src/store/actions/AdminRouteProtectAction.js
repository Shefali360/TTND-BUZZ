import * as actionTypes from "./actionTypes";
import axios from "axios";

export const isAdmin = (data) => {
  return {
    type: actionTypes.IS_ADMIN,
    data: data,
  };
};

export const isNotAdmin = (err) => {
  return {
    type: actionTypes.IS_NOT_ADMIN,
    error: err,
  };
};

export const checkAdmin = () => {
 
  return (dispatch) => {
    const token=JSON.parse(localStorage.getItem("token"));
        axios.get("http://localhost:3030/admin",
        {headers:{"authorization":`Bearer ${token.access_token},Bearer ${token.id_token}`}})
      .then((response) => {
        
        console.log(response.data);
        localStorage.setItem("adminPrivilege",response.data);
        dispatch(isAdmin(response.data));
      })
      .catch((error) => {
        dispatch(isNotAdmin(error));
      });
  };
};


