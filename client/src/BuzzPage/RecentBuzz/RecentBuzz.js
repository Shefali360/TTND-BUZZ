import React, { Component } from "react";
import styles from "./RecentBuzz.module.css";
import thoughts from "../../Images/thoughts.jpeg";

class RecentBuzz extends Component {
  state = {
    likeCount: 0,
    dislikeCount: 0,
    liked: false,
    disliked: false,
  };

  timed = (duration) => {
    const timeType = [60, 3600, 86400, 604800, 2419200, 29030400];
    const unit = ["min", "h", "d", "w", "m", "y"];
    let seconds = duration / 1000;
    let defDuration = "now";
    let durationQuantity = 0;
    if (seconds > 29030400) {
      return `${Math.floor(seconds / 29030400)}y ago`;
    }

    for (let index = 0; index < timeType.length - 1; index++) {
      if (seconds > timeType[index] && seconds < timeType[index + 1]) {
        durationQuantity = seconds / timeType[index];
        defDuration = unit[index];
        break;
      }
    }
    if (defDuration === "now") return defDuration;
    else {
      return `${Math.floor(durationQuantity)}${defDuration} ago`;
    }
  };
  toggleClick = (type) => {
    if (type === "like") {
      this.setState({
        likeCount: this.state.likeCount + 1,
        liked: true,
        disliked: false,
      });
    } else if (type === "dislike") {
      this.setState({
        dislikeCount: this.state.dislikeCount + 1,
        disliked: true,
        liked: false,
      });
    }
  };

  render() {
    const todayDate = new Date();
    const time = todayDate.getTime();
    // console.log(time);
    const dayNum = todayDate.getDate();
    const dayFormat = dayNum.length < 2 ? "0" + dayNum : dayNum;
    const month = todayDate.getMonth() + 1;
    const monthFormat = month < 10 ? "0" + month : month;
    let dur = 1590464614832 - 1590264614832;
    const email = "shefali.goyal@tothenew.com";
    return (
      <div className={styles.recentBuzz}>
        <h4>Recent Buzz</h4>
        <div className={styles.buzzes}>
          <span className={styles.date}>
            {dayFormat}/<br />
            {monthFormat}
          </span>
          <div className={styles.rightDiv}>
            <img src={thoughts} alt="Posted"></img>
            <span className={styles.userId}>{email}</span>
            <span className={styles.duration}>{this.timed(dur)}</span>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <div className={styles.reviews}>
              <span className={styles.count}>{this.state.likeCount}</span>
              <button
                onClick={() => this.toggleClick("like")}
                className={styles.button}
              >
                <i
                  className={
                    "fa fa-thumbs-up" +
                    " " +
                    (this.state.liked ? styles.Active : null)
                  }
                ></i>
              </button>
              <span className={styles.count}>{this.state.dislikeCount}</span>
              <button
                onClick={() => this.toggleClick("dislike")}
                className={styles.button}
              >
                <i
                  className={
                    "fa fa-thumbs-down fa-flip-horizontal" +
                    " " +
                    (this.state.disliked ? styles.Active : null)
                  }
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecentBuzz;
