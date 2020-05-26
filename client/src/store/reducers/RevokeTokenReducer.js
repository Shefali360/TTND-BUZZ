import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState={
    loggedout:false
}

const tokenRevoked=(state,action)=>{
    console.log("Successful");
    return(updateObject(state,{
        loggedout:true,
        token:null
     }))
    
}

const tokenRevokeFailed=(state,action)=>{
   console.log("Error");
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.TOKEN_REVOKED:return tokenRevoked(state,action);
        case actionTypes.TOKEN_REVOKE_FAILED:return tokenRevokeFailed(state,action);
        default:return state;
    }
}
export default reducer;