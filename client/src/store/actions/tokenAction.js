import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as queryString from 'query-string';

export const tokenReceived=(data)=>{
return{
    type:actionTypes.TOKEN_RECEIVED,
    data:data
}

}

export const tokenReceiveFailed=(err)=>{
    return{
        type:actionTypes.TOKEN_RECEIVE_FAILED,
        error:err
    }
}

export const fetchToken=()=>{
    const urlParams = queryString.parse(window.location.search);
    console.log(`code:${urlParams.code}`);
    return dispatch=>{
        axios.get(`http://localhost:3030/authToken/${encodeURIComponent(urlParams.code)}`)
    .then(response=>{
        console.log(response.data);
        dispatch(tokenReceived(response.data));
    })
    .catch(error=>{
        dispatch(tokenReceiveFailed(error));
    })
}
} 