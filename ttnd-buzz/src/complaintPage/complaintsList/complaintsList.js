import React, { Component } from "react";
import styles from './complaintsList.module.css';

class complaintsList extends Component {
  render() {
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
          <tr>
            <td>Admin</td>
            <td>123456</td>
            <td>Shefali Goyal</td>
            <td>Open</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default complaintsList;
