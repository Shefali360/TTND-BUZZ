import * as actionTypes from "./actionTypes";
import axios from "axios";

export const LikeClicked = (data) => {
  return {
    type: actionTypes.LIKE_CLICKED,
    like: data,
  };
};

export const LikeClickFailed = (err) => {
  return {
    type: actionTypes.LIKE_CLICK_FAILED,
    error: err,
  };
};

export const Liked= () => {
  return (dispatch) => {
    const token=JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        'http://localhost:3030/buzz/:id',{headers:{"authorization":`Bearer ${token.access_token},null`}}
      )
      .then((response) => {
        dispatch(LikeClicked(response.data));
      })
      .catch((error) => {
        dispatch(LikeClickFailed(error));
      });
  };
};
