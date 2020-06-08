// import * as actionTypes from "./actionTypes";
// import axios from "axios";

// export const buzzReceived = (data) => {
//   return {
//     type: actionTypes.BUZZ_RECEIVED,
//     buzz: data,
//   };
// };

// export const buzzFailed = (err) => {
//   return {
//     type: actionTypes.BUZZ_FAILED,
//     error: err,
//   };
// };

// export const fetchBuzz= (skip, limit) => {
//   console.log("getBuzzzActionskip", skip);
//   console.log("getBuzzzActionlimit", limit);
//   return (dispatch) => {
//     const token=JSON.parse(localStorage.getItem("token"));
//     axios
//       .get(
//         `http://localhost:3030/buzz?skip=${skip}&limit=${limit}`, {headers:{"authorization":`Bearer ${token.access_token},null`}}
//       )
//       .then((response) => {
//         const res={
//           data:response.data,
//           skip:skip + 5,
//           hasMore:!(response.data.length < limit)
//         }
//         dispatch(buzzReceived(res));
//       })
//       .catch((error) => {
//         console.log(error);
//         dispatch(buzzFailed(error));
//       });
//   };
// };
