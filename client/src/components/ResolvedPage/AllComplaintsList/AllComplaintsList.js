import React, { Component } from "react";
import dropdownStyles from "../../Dropdown/Dropdown.module.css";
import styles from "./AllComplaintsList.module.css";
import sharedStyles from "../../../containers/ComplaintList/ComplaintList.module.css";
import axios from "axios";
import { connect } from "react-redux";
import Spinner from "../../../components/Spinner/Spinner";
import ComplaintPopup from "../../ComplaintPopup/ComplaintPopup";
import {stringify} from "query-string";

class AllComplaintsList extends Component {
  state = {
    popupVisible: false,
    value: "",
    id: null,
    issueId: null,
    allComplaintsList: [],
    descriptionPopupVisible: false,
    complaint: [],
    estimatedTime: {
      count: 0,
      timeType: "hours",
      status: "",
    },
    department:'',
    status:'',
    search:'',
    searchInput:'',
    filters:{},
    submitDisabled: true,
  };
  timePopupPosition;

  componentDidMount() {
    axios
      .get("http://localhost:3030/complaint/all", {
        headers: {
          authorization: `Bearer ${this.props.data.access_token},Bearer ${this.props.data.id_token}`,
        },
      })
      .then((res) => {
        this.setState({
          allComplaintsList: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
      });
  }

  handleEstimatedTimeChange = (event) => {
    const estimatedTime = { ...this.state.estimatedTime };
    estimatedTime[event.target.name] = event.target.value;
    this.setState(
      {
        estimatedTime: estimatedTime,
      },
      () => {
        console.log(this.state.estimatedTime);
        if (
          this.state.estimatedTime.count !== 0 &&
          this.state.estimatedTime.timeType !== ""
        )
          this.setState({ submitDisabled: false });
      }
    );
  };

  handleFilterChange=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  applyFilters=()=>{
    const filters={};
    if(this.state.department){
      filters["department"]=this.state.department;
    }
    if(this.state.status){
      filters["status"]=this.state.status;
    }
    if(this.state.search){
      filters[this.state.search]=this.state.searchInput;
    }
    this.setState({filters:filters});
    console.log(filters);
    axios
      .get("http://localhost:3030/complaint/all?"+stringify(filters),{
        headers: {
          authorization:`Bearer ${this.props.data.access_token},Bearer ${this.props.data.id_token}`,
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          allComplaintsList: res.data,
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
      .get("http://localhost:3030/complaint/all",{
        headers: {
          authorization:`Bearer ${this.props.data.access_token},Bearer ${this.props.data.id_token}`,
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          allComplaintsList: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
      });
  }
  submitHandler = (event) => {
    console.log(this.state.value);
    event.preventDefault();
    console.log(this.state.estimatedTime.count);
    const formData = {
      estimatedTime: {
        count: this.state.estimatedTime.count,
        timeType: this.state.estimatedTime.timeType,
      },
      status: this.state.value,
    };
    axios
      .patch(`http://localhost:3030/complaint/${this.state.id}`, formData, {
        headers: {
          authorization: `Bearer ${this.props.data.access_token},Bearer ${this.props.data.id_token}`,
        },
      })
      .then((res) => {
        this.setState({
          // formSubmitted: true,
          popupVisible:false,
          submitDisabled: true,
          estimatedTime: { count: 0, timeType: "hours" },
        });
        console.log(res);
        // setTimeout(() => {this.setState({formSubmitted: false});}, 1000);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  closePopup = () => {
    this.setState({
      popupVisible: false,
    });
  };

  closeDescriptionPopup = () => {
    this.setState({
      complaint: [],
      descriptionPopupVisible: false,
    });
  };
  openPopupOnDropdownClick = (event, id, issueId) => {
    let card = document.getElementById("card").getBoundingClientRect();
    const cardX = card.x;
    const cardY = card.y;
    const positionMeta = event.target.getBoundingClientRect();
    this.timePopupPosition = {
      top: "" + positionMeta["y"] - cardY + "px",
      left: "" + positionMeta["x"] - cardX - positionMeta["width"] - 50 + "px",
    };
    if (event.target.value=== "In Progress") {
      this.setState({
        popupVisible: true,
        id: id,
        issueId: issueId,
      });
    }
  };
  
  handleChange = (event,id) => {
    if (event.target.value === "In Progress") {
      this.setState({ value: event.target.value });
    } else 
     {
      axios
        .patch(
          `http://localhost:3030/complaint/${id}`,
          { status: event.target.value },
          {
            headers: {
              authorization: `Bearer ${this.props.data.access_token},Bearer ${this.props.data.id_token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  statusColor=(status)=>{
    switch (status) {
      case "Open":return styles.open;
      case "In Progress":return styles.progress;
      case "Closed":return styles.closed;
      default:return null;
    }
  }
  render() {
    let tableData = null;
    if (this.state.allComplaintsList.length !== 0) {
      let count = this.state.allComplaintsList;
      tableData = count.map((complaint) => {
        return (
          <tr key={complaint._id}>
            <td>{complaint.department}</td>
            <td
              className={styles.issueId}
              onClick={() => {
                this.setState({
                  complaint: complaint,
                  descriptionPopupVisible: true,
                });
              }}
            >
              {complaint.issueId}
            </td>
            <td>{complaint.lockedBy}</td>
            <td>{complaint.assignedTo}</td>
            <td>
              <div className={dropdownStyles.dropdown}>
                <select
                  defaultValue={complaint.status}
                  ref={this.statusColor}
                  className={this.statusColor(complaint.status)}
                  name="status"
                  onChange={(event)=>this.handleChange(event,complaint._id)}
                  onClick={(event) =>
                    this.openPopupOnDropdownClick(
                      event,
                      complaint._id,
                      complaint.issueId
                    )
                  }
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </td>
          </tr>
        );
      });
    }
    return (
      <div id="card" className={sharedStyles.complaintsList}>
        <h4>All Complaints</h4>
        <div className={styles.filterFields}>
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
          <div className={styles.search}>
            <input type="search" placeholder="Search" name="searchInput" onChange={this.handleFilterChange}/>
            <div className={dropdownStyles.dropdown}>
              <select name="search" onChange={this.handleFilterChange}>
              <option value="" defaultValue>Search By</option>
              <option value="issueId" defaultValue>Issue Id</option>
              <option value="lockedBy" defaultValue>Locked By</option>
              </select>
            </div>
          </div>
          <i className={["fa fa-check",styles.check].join(' ')}onClick={this.applyFilters}></i>
          <i className={["fa fa-undo",styles.undo].join(' ')}  onClick={this.resetFilters}></i>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Department</th>
              <th>Issue Id</th>
              <th>Locked By</th>
              <th>Assigned To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
        {this.state.descriptionPopupVisible ? (
          <ComplaintPopup
            complaint={this.state.complaint}
            click={this.closeDescriptionPopup}
          />
        ) : null}
        {this.state.error ? <p>Complaint List can't be loaded</p> : null}
        {!this.state.error && this.state.allComplaintsList.length === 0 ? (
          <Spinner />
        ) : null}
        <div
          style={this.timePopupPosition}
          className={
            styles.popup +
            " " +
            (this.state.popupVisible ? "null" : styles.display)
          }
        >
          <span>
            <h5>
              Estimated Time
            </h5>
          </span>
          <form>
            <div className={styles.formdata}>
              <input
                type="text"
                placeholder="Count"
                name="count"
                value={this.state.estimatedTime.count}
                onChange={this.handleEstimatedTimeChange}
              />
              <div className={styles.dropdown}>
                <select
                  className={styles.select}
                  name="timeType"
                  value={this.state.estimatedTime.timeType}
                  onChange={this.handleEstimatedTimeChange}
                >
                  <option value="hours">hours</option>
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                  <option value="months">months</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              value="submit"
              disabled={this.state.submitDisabled}
              onClick={(event) => {
                this.submitHandler(event);
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.auth.token,
  };
};
export default connect(mapStateToProps)(AllComplaintsList);
