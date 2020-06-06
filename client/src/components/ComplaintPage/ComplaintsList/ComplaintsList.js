// import React, { Component } from "react";
// import styles from './ComplaintsList.module.css';
// import { connect } from "react-redux";
// import ComplaintPopup from '../../../components/ComplaintPopup/ComplaintPopup';

// class complaintsList extends Component {
//   state={
//     issueId:null,
//     complaintData:this.props.complaints
//   }

//   showComplaintInfo=(issueId)=>{
//     console.log(this.state.complaintData);
//     let complaintpopup=null;
//     console.log(issueId);
//     if(issueId===this.state.complaintData.issueId){          
//    complaintpopup=(<ComplaintPopup issueId={this.state.complaintData.issueId} 
//     assignedTo={this.state.complaintData.assignedTo}
//    department={this.state.complaintData.department} issue={this.state.complaintData.issue} concern={this.state.complaintData.concern}
//    status={this.state.complaintData.status}/>)
//    console.log(complaintpopup);
//    return complaintpopup;
//     }
//   }
//   render() {
//     return (
//           <tr>
//             <td>{this.props.department}</td>
//             <td className={styles.issueId} onClick={(issueId)=>this.showComplaintInfo(this.props.issueId)}>{this.props.issueid}</td>
//             <td>{this.props.assignedto}</td>
//             <td>{this.props.status}</td>
//           </tr>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//    complaints:state.userComplaintList.complaintList,
//    error:state.userComplaintList.error
//   };
// };

// export default connect(mapStateToProps)(complaintsList);
