import React, { Component } from "react";
import styles from './ComplaintsList.module.css';
import { connect } from "react-redux";
import ComplaintPopup from '../../../components/ComplaintPopup/ComplaintPopup';

class complaintsList extends Component {
  state={
    issueId:null
  }
  render() {
    let popup=null;
    if (this.props.complaints.length!==0) {
     
       let count = this.props.complaints;
      popup = count.map((complaint) => {
        // this.setState({issueId:complaint.issueId});
           return(
            
   <ComplaintPopup issueId={complaint.issueId} assignedTo={complaint.assignedTo}
               department={complaint.department} issue={complaint.issue} concern={complaint.concern}
               status={complaint.status}/>)
           })
       }
    return (
          <tr>
            <td>{this.props.department}</td>
            <td className={styles.issueId}>{this.props.issueid}</td>
            <td>{this.props.assignedto}</td>
            <td>{this.props.status}</td>
          </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return {
   complaints:state.userComplaintList.complaintList,
   error:state.userComplaintList.error
  };
};

export default connect(mapStateToProps)(complaintsList);
