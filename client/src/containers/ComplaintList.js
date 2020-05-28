import React, { Component } from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import Spinner from '../components/Spinner/Spinner';
import ComplaintList from '../ComplaintPage/ComplaintsList/ComplaintsList';
import styles from './ComplaintList.module.css';


class UserComplaintList extends Component {

  componentDidMount() {
    this.props.getUserComplaintList();
  }
  render() {
    let tableData=this.props.error?<p>Complaint List can't be loaded</p>:<Spinner/>;
     if (this.props.complaints.length!==0) {
        let count = this.props.complaints;
        tableData = count.map((complaint) => {
            return (
                <tbody key={complaint._id}>
               <ComplaintList department={complaint.department} issueid={complaint.issueId}
               assignedto={complaint.assignedTo} status={complaint.status}/>
               </tbody>
            );
       });
  }
 return (
    <div className={styles.complaintsList}>
    <h4>Your Complaints</h4>
    <table>
        <thead>
      <tr>
        <th>Department</th>
        <th>Issue Id</th>
        <th>Assigned To</th>
        <th>Status</th>
      </tr>
      </thead>
          {tableData}
          </table>

      </div>
    );
}
}
const mapStateToProps = (state) => {
  return {
   complaints:state.userComplaintList.complaintList,
   error:state.userComplaintList.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserComplaintList: () => dispatch(actions.fetchComplaintList())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserComplaintList);