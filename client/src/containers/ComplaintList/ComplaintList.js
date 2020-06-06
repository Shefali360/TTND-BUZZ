import React, { Component } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import ComplaintList from "../../components/ComplaintPage/ComplaintsList/ComplaintsList";
import styles from "./ComplaintList.module.css";
import ComplaintPopup from '../../components/ComplaintPopup/ComplaintPopup';

class UserComplaintList extends Component {

  state = {
    complaint: null,
    popupVisible: false
  }

  componentDidMount() {
    this.props.getUserComplaintList();
  }
  render() {

    console.log(this.state);

    let tableData = null;
    if (this.props.complaints.length !== 0) {
      let count = this.props.complaints;
      tableData = count.map((complaint) => {
        return (
            <tr key={complaint._id}>
              <td>{complaint.department}</td>
              <td className={styles.issueId} onClick={()=> {
                  this.setState({
                    complaint: complaint,
                    popupVisible: true
                  })
                }
              }
              >
                  {complaint.issueId}
              </td>
              <td>{complaint.assignedTo}</td>
              <td>{complaint.status}</td>
            </tr>
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
          <tbody>
            {tableData}
          </tbody>
        </table>
        {this.state.popupVisible ? <ComplaintPopup complaint={this.state.complaint}/> : null }
        {this.props.error ? <p>Complaint List can't be loaded</p> : null}
        {!this.props.error && this.props.complaints.length === 0 ? (
          <Spinner />
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    complaints: state.userComplaintList.complaintList,
    error: state.userComplaintList.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserComplaintList: () => dispatch(actions.fetchComplaintList()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserComplaintList);
