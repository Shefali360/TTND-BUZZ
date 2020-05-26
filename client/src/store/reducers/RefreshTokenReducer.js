import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

// const initialState={
//     loggedout:false
// }

const refreshedTokenReceived=(state,action)=>{
    console.log("Successful");
    return(updateObject(state,{
        token:action.data
     }))
    
}

const refreshedTokenFailed=(state,action)=>{
   console.log("Error");
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.REFRESHED_TOKEN_RECEIVED:return refreshedTokenReceived(state,action);
        case actionTypes.REFRESHED_TOKEN_FAILED:return refreshedTokenFailed(state,action);
        default:return state;
    }
}
export default reducer;