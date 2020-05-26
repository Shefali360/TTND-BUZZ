import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState={
    adminPrivilege:false
}

const isAdmin=(state,action)=>{
    console.log("Successful");
    return(updateObject(state,{
        adminPrivilege:action.data
     }))
    
}

const isNotAdmin=(state,action)=>{
   return{
       error:true
   }
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.IS_ADMIN:return isAdmin(state,action);
        case actionTypes.IS_NOT_ADMIN:return isNotAdmin(state,action);
        default:return state;
    }
}
export default reducer;