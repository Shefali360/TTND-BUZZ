import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState={
    complaintList:[]
}

const complaintListReceived=(state,action)=>{
    let arr=[];
    arr=action.complaintList;
    console.log(" Complaint List Received Successfully");
    return(updateObject(state,{
        complaintList:arr
     }))
    
}

const complaintListFailed=(state,action)=>{
 return(updateObject(state,{
     error:true
 }))
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.COMPLAINT_LIST_RECEIVED:return complaintListReceived(state,action);
        case actionTypes.COMPLAINT_LIST_FAILED:return complaintListFailed(state,action);
        default:return state;
    }
}
export default reducer;