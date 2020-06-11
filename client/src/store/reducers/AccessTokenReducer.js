import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';


const token=localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null;

const expirationDate = token?new Date(
          new Date().getTime() + token.expires_in * 1000
        ):null;
const initialState={
    token:token,
    error:false,
    expirationDate:expirationDate
}


const tokenReceived=(state,action)=>{
return(updateObject(state,{
       token:action.data
    }
))
}

const tokenReceiveFailed=(state,action)=>{
    return(updateObject(state,{error:true}))
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.TOKEN_RECEIVED:return tokenReceived(state,action);
        case actionTypes.TOKEN_RECEIVE_FAILED:return tokenReceiveFailed(state,action);
        default:return state;
    }
}
export default reducer;