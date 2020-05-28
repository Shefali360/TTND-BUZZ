import React, { Component } from "react";
import styles from './ComplaintsList.module.css';

class complaintsList extends Component {
  render() {
    return (
          <tr>
            <td>{this.props.department}</td>
            <td>{this.props.issueid}</td>
            <td>{this.props.assignedto}</td>
            <td>{this.props.status}</td>
          </tr>
    );
  }
}

export default complaintsList;
