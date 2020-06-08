import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./ComplaintList.module.css";
import ComplaintPopup from '../../components/ComplaintPopup/ComplaintPopup';
import dropdownStyles from "../../components/Dropdown/Dropdown.module.css";
import sharedStyles from "../../components/ResolvedPage/AllComplaintsList/AllComplaintsList.module.css";
import axios from "axios";
import {stringify} from "query-string";
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../../components/Loader/Loader';

class UserComplaintList extends Component {
  state = {
    complaint:[],
    popupVisible: false,
    department:'',
    status:'',
    searchInput:'',
    filters:{},
    complaintsList:[],
    error:false,
    skip:0
  }

  limit= 5;

  getComplaints=()=>{
    axios
    .get(`http://localhost:3030/complaint`, {
      headers: {
        authorization: `Bearer ${this.props.data.access_token},Bearer ${this.props.data.id_token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      const complaintsList = Array.from(this.state.complaintsList);
      complaintsList.push(...res.data);
      this.setState({
        complaintsList:complaintsList,
        // skip:this.state.skip + 5,
        // hasMore:!(res.data.length<this.limit)
      })
      })
    .catch((err) => {
      console.log(err);
      this.setState({ error: true });
    });

  }
  componentDidMount() {
   this.getComplaints();
  }
  handleFilterChange=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  closePopup=()=>{
    this.setState({
      complaint:[],
      popupVisible:false
    })
  }

  statusColor=(status)=>{
    if(status==="Open"){
      return styles.open;
    }
    else if(status==="In Progress"){
      return styles.progress;
    }else if(status==="Closed"){
      return styles.closed;
    }
  }

  applyFilters=()=>{
    const filters={};
    if(this.state.department){
      filters["department"]=this.state.department;
    }
    if(this.state.status){
      filters["status"]=this.state.status;
    }
    if(this.state.searchInput){
      filters["issueId"]=this.state.searchInput;
    }
    this.setState({filters:filters});
    axios
      .get("http://localhost:3030/complaint?"+stringify(filters),{
        headers: {
          authorization:`Bearer ${this.props.data.access_token},Bearer ${this.props.data.id_token}`,
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          complaintsList: res.data
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
      });
  }
  resetFilters=()=>{
    this.setState({filters:{}});
    axios
      .get("http://localhost:3030/complaint",{
        headers: {
          authorization:`Bearer ${this.props.data.access_token},Bearer ${this.props.data.id_token}`,
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          complaintsList: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
      });
  }


  render() {

    let tableData = null;
    if (this.state.complaintsList.length !== 0) {
      let count = this.state.complaintsList;
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
              <td className={this.statusColor(complaint.status)}>{complaint.status}</td>
            </tr>
        );
      });
    }
    return (
      <div className={styles.complaintsList}>
        <h4>Your Complaints</h4>
        <div className={sharedStyles.filterFields}>
          <div className={dropdownStyles.dropdown}>
            <select name="department" onChange={this.handleFilterChange}>
            <option value="" defaultValue>Department</option>
            <option value="Admin" defaultValue>Admin</option>
            <option value="IT" defaultValue>IT</option>
            <option value="HR" defaultValue>HR</option>
            <option value="Infra" defaultValue>Infra</option>
            </select>
          </div>
          <div className={dropdownStyles.dropdown}>
            <select name="status"  onChange={this.handleFilterChange}>
            <option value="" defaultValue>Status</option>
            <option value="Open" defaultValue>Open</option>
            <option value="In Progress" defaultValue>In Progress</option>
            <option value="Closed" defaultValue>Closed</option>
            </select>
          </div>
          <div className={[sharedStyles.search,styles.search].join(' ')}>
            <input type="search" placeholder="Search" name="searchInput" onChange={this.handleFilterChange}/>
          </div>
          <i className={["fa fa-check",sharedStyles.check].join(' ')}onClick={this.applyFilters}></i>
          <i className={["fa fa-undo",sharedStyles.undo].join(' ')}  onClick={this.resetFilters}></i>
        </div>
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Issue Id</th>
              <th>Assigned To</th>
              <th>Status</th>
            </tr>
          </thead>
          {/* <InfiniteScroll
              loadMore={this.getComplaints}
              hasMore={this.state.hasMore}
              loader={<Loader key={1}/>}
              useWindow={false}
              initialLoad={false}
        > */}
          <tbody>
            {tableData}
          </tbody>
          {/* </InfiniteScroll> */}
        </table>
        {this.state.popupVisible ? <ComplaintPopup complaint={this.state.complaint} click={this.closePopup}/> : null }
        {this.state.error ? <p>Complaint List can't be loaded</p> : null}
        {!this.state.error && this.state.complaintsList.length === 0 ? (
          <Spinner />
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.auth.token
  };
};

export default connect(mapStateToProps)(UserComplaintList);
