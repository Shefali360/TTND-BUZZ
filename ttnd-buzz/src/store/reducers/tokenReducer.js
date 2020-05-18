import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState={
    token:null,
    error:false
}

const tokenReceived=(state,action)=>{
    console.log(action.data);
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