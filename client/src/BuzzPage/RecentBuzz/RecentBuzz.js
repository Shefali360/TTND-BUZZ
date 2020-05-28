import React, { Component } from "react";
import styles from "./RecentBuzz.module.css";
// import Corousel from '../../components/Corousel/Corousel';

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
    if (defDuration==="now") return defDuration;
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
    return (
      <div className={styles.recentBuzz}>
        <div className={styles.buzzes}>
          <span className={styles.date}>
            {this.props.dayFormat}/<br />
            {this.props.monthFormat}
          </span>
          <div className={styles.rightDiv}>
           {(this.props.image)?<img src={this.props.image} alt={this.props.alt}></img>:null}
            <span className={styles.userId}>{this.props.email}</span>
            <span className={styles.duration}>{this.timed(this.props.duration)}</span>
            <p>
              {this.props.description}
            </p>
            <div className={styles.reviews}>
              <span className={styles.count}>{this.props.likeCount}</span>
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
              <span className={styles.count}>{this.props.dislikeCount}</span>
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
