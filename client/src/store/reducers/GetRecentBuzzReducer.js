// import * as actionTypes from '../actions/actionTypes';
// import {updateObject} from '../../shared/utility';

// const initialState={
//     recentBuzz:null
// }

// const buzzReceived=(state,action)=>{
//     console.log(" Buzz Recieved Successfully");
//     return(updateObject(state,{
//         recentBuzz:action.buzz
//      }))
    
// }

// const buzzFailed=(state,action)=>{
//  return(updateObject(state,{
//      error:true
//  }))
// }

// const reducer=(state=initialState,action)=>{
//     switch(action.type){
//         case actionTypes.BUZZ_RECEIVED:return buzzReceived(state,action);
//         case actionTypes.BUZZ_FAILED:return buzzFailed(state,action);
//         default:return state;
//     }
// }
// export default reducer;