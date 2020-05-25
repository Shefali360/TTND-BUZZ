import React, { Component } from "react";
import sharedStyles from "../../ComplaintPage/ComplaintsList/ComplaintsList.module.css";
import Dropdown from "../../components/Dropdown/Dropdown";
import dropdownStyles from "../../components/Dropdown/Dropdown.module.css";
import styles from "./AllComplaintsList.module.css";

class AllComplaintsList extends Component {
  state = {
    popupVisible: false,
    value: "Open",
    id: null,
    issueId: null,
  };
  timePopupPosition;
  closePopup = () => {
    this.setState({
      popupVisible: false,
    });
  };
  openPopupOnDropdownClick = (event, id, issueId) => {
    let card = document.getElementById("card").getBoundingClientRect();
    const cardX = card.x;
    const cardY = card.y;
    const positionMeta = event.target.getBoundingClientRect();
    this.timePopupPosition = {
      "top": ""+ positionMeta["y"] - cardY+"px",
      "left": "" +positionMeta["x"] - cardX - positionMeta["width"]-50+"px",
    };
    if (this.state.value === "Open" || this.state.value === "In Progress") {
      this.setState({
        popupVisible: true,
        id: id,
        issueId: issueId,
      });
    }
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div
        id="card"
        className={[sharedStyles.complaintsList,styles.card].join(" ")}
      >
        <h4>Your Complaints</h4>
        <div className={styles.filterFields}>
          <div className={dropdownStyles.dropdown}>
            <select name="department">
              <Dropdown value="" optionName="Department" />
              <Dropdown value="Admin" optionName="Admin" />
              <Dropdown value="IT" optionName="IT" />
              <Dropdown value="HR" optionName="HR" />
              <Dropdown value="HR" optionName="Infra" />
            </select>
          </div>
          <div className={dropdownStyles.dropdown}>
            <select name="status">
              <Dropdown value="" optionName="Status" />
              <Dropdown value="Open" optionName="Open" />
              <Dropdown value="In Progress" optionName="In Progress" />
              <Dropdown value="Closed" optionName="Closed" />
            </select>
          </div>
          <div className={styles.search}>
            <input type="search" placeholder="Search" />
            <div className={dropdownStyles.dropdown}>
              <select name="search">
                <Dropdown value="" optionName="Search By" />
                <Dropdown value="issueId" optionName="Issue Id" />
                <Dropdown value="lockedBy" optionName="Locked By" />
              </select>
            </div>
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                Department<i className="fa fa-sort"></i>
              </th>
              <th>Issue Id</th>
              <th>Locked By</th>
              <th>Assigned To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Admin</td>
              <td>123456</td>
              <td>Shefali Goyal</td>
              <td>Shefali Goyal</td>
              <td>
                <div className={dropdownStyles.dropdown}>
                  <select
                    name="status"
                    onChange={this.handleChange}
                    onClick={(event) =>
                      this.openPopupOnDropdownClick(event, 12, 23)
                    }
                  >
                    <Dropdown value="Open" optionName="Open" />
                    <Dropdown value="In Progress" optionName="In Progress" />
                    <Dropdown value="Closed" optionName="Closed" />
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td>Admin</td>
              <td>123456</td>
              <td>Shefali Goyal</td>
              <td>Shefali Goyal</td>
              <td id="cell">
                <div className={dropdownStyles.dropdown}>
                  <select
                    name="status"
                    onChange={this.handleChange}
                    onClick={(event) =>
                      this.openPopupOnDropdownClick(event, 12, 23)
                    }
                  >
                    <Dropdown value="Open" optionName="Open" />
                    <Dropdown value="In Progress" optionName="In Progress" />
                    <Dropdown value="Closed" optionName="Closed" />
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td>Admin</td>
              <td>123456</td>
              <td>Shefali Goyal</td>
              <td>Shefali Goyal</td>
              <td id="cell">
                <div className={dropdownStyles.dropdown}>
                  <select
                    name="status"
                    onChange={this.handleChange}
                    onClick={(event) =>
                      this.openPopupOnDropdownClick(event, 12, 23)
                    }
                  >
                    <Dropdown value="Open" optionName="Open" />
                    <Dropdown value="In Progress" optionName="In Progress" />
                    <Dropdown value="Closed" optionName="Closed" />
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td>Admin</td>
              <td>123456</td>
              <td>Shefali Goyal</td>
              <td>Shefali Goyal</td>
              <td id="cell">
                <div className={dropdownStyles.dropdown}>
                  <select
                    name="status"
                    onChange={this.handleChange}
                    onClick={(event) =>
                      this.openPopupOnDropdownClick(event, 12, 23)
                    }
                  >
                    <Dropdown value="Open" optionName="Open" />
                    <Dropdown value="In Progress" optionName="In Progress" />
                    <Dropdown value="Closed" optionName="Closed" />
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td>Admin</td>
              <td>123456</td>
              <td>Shefali Goyal</td>
              <td>Shefali Goyal</td>
              <td id="cell">
                <div className={dropdownStyles.dropdown}>
                  <select
                    name="status"
                    onChange={this.handleChange}
                    onClick={(event) =>
                      this.openPopupOnDropdownClick(event, 12, 23)
                    }
                  >
                    <Dropdown value="Open" optionName="Open" />
                    <Dropdown value="In Progress" optionName="In Progress" />
                    <Dropdown value="Closed" optionName="Closed" />
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td>Admin</td>
              <td>123456</td>
              <td>Shefali Goyal</td>
              <td>Shefali Goyal</td>
              <td id="cell">
                <div className={dropdownStyles.dropdown}>
                  <select
                    name="status"
                    onChange={this.handleChange}
                    onClick={(event) =>
                      this.openPopupOnDropdownClick(event, 12, 23)
                    }
                  >
                    <Dropdown value="Open" optionName="Open" />
                    <Dropdown value="In Progress" optionName="In Progress" />
                    <Dropdown value="Closed" optionName="Closed" />
                  </select>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={this.timePopupPosition}
          className={
            styles.popup +
            " " +
            (this.state.popupVisible ? "null" : styles.display)
          }
        >
          <span>
            <h5>
              Estimated Time
              <button className={styles.close} onClick={this.closePopup}>
                <i className="fa fa-window-close"></i>
              </button>
            </h5>
          </span>
          <form>
            <div className={styles.formdata}>
              <input type="text" placeholder="Count" />
              <div className={styles.dropdown}>
                <select className={styles.select} name="department">
                  <option value="hours">hours</option>
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                  <option value="months">months</option>
                </select>
              </div>
            </div>
            <button type="submit" value="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AllComplaintsList;
