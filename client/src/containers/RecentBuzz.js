import React, { Component } from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import Spinner from '../components/Spinner/Spinner';
import RecentBuzz from '../BuzzPage/RecentBuzz/RecentBuzz';
import styles from './RecentBuzz.module.css';

class RecentBuzzData extends Component {

  componentDidMount() {
    this.props.getRecentBuzz();
  }
  render() {
   
    let buzzData=this.props.error?<p>Buzz data can't be loaded</p>:<Spinner/>;
     if (this.props.buzz.length!==0) {
        let count = this.props.buzz;

      buzzData = count.map((buzz) => {

      const todayDate = new Date();
      const time = todayDate.getTime();
      let dur =time-buzz.createdOn;
      let d=new Date(buzz.createdOn);
      const dayNum=d.getDate();
      const dayFormat = dayNum.length < 2 ? "0" + dayNum : dayNum;
      const month=d.getMonth()+1;
      const monthFormat = month < 10 ? "0" + month : month;
      let imageData=null;
      let altData=null;
      if(buzz.images.length!==0){
        imageData= `http://localhost:3030/${buzz.images[0]}`;
      }
      if(buzz.images.length!==0){
        altData= `${buzz.images[0]}`;
      }
            return (
              <li key={buzz._id} >
                <RecentBuzz email={buzz.userId} description={buzz.description} likeCount={buzz.likes} dislikeCount={buzz.dislikes}
                dayFormat={dayFormat} monthFormat={monthFormat}
                 duration={dur} image={imageData} alt={altData}/>
              </li>
            );
       });
  }
 return (

      <div className={styles.mainDiv}>
      <h4 className={styles.heading}>Recent Buzz</h4>
      <ul className={styles.List}>
       {buzzData}
       </ul>
      </div>
    );
}
}
const mapStateToProps = (state) => {
  return {
   buzz:state.recentBuzz.recentBuzz,
   error:state.recentBuzz.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecentBuzz: () => dispatch(actions.fetchBuzz())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RecentBuzzData);