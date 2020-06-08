import React, { Component } from "react";
// import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from '../../components/Spinner/Spinner';
import Loader from '../../components/Loader/Loader';
import RecentBuzz from '../../components/BuzzPage/RecentBuzz/RecentBuzz';
import styles from './RecentBuzz.module.css';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';

class RecentBuzzData extends Component {
  state={
    buzz:[],
    error:false,
    skip:0,
    hasMore:false
  }

  limit= 5;

  getBuzz=()=>{

    axios
      .get(
        `http://localhost:3030/buzz?skip=${this.state.skip}&limit=${this.limit}`, {headers:{"authorization":`Bearer ${this.props.data.access_token},Bearer ${this.props.data.id_token} `}}
      ).then((res)=>{
        const buzz = Array.from(this.state.buzz);
        buzz.push(...res.data);
        this.setState({
          buzz: buzz,
          skip:this.state.skip + 5,
          hasMore:!(res.data.length<this.limit)})
      }).catch((err)=>{
        console.log(err);
        this.setState({error:true})
      })
  }
  
  componentDidMount() {
    this.getBuzz();
  }

  render() {
    let buzzData=this.state.error?<p>Buzz data can't be loaded</p>:<Spinner/>;
     if (this.state.buzz.length!==0) {
      let count = this.state.buzz;
      buzzData = count.map((buzz) => {
      const todayDate = new Date();
      const time = todayDate.getTime();
      let dur =time-buzz.createdOn;
      let d=new Date(buzz.createdOn);
      const dayNum=d.getDate();
      const dayFormat = dayNum < 10 ? "0" + dayNum : dayNum;
      const month=d.getMonth()+1;   
      const monthFormat = month < 10 ? "0" + month : month;
      let imageData=[];
      let altData=null;
      if(buzz.images.length!==0){
        imageData=buzz.images;
      }
      if(buzz.images.length!==0){
        altData= `${buzz.images[0]}`;
      }
            return (
              <li key={buzz._id} >
                <RecentBuzz 
                email={buzz.userId} description={buzz.description} likeCount={buzz.likes} dislikeCount={buzz.dislikes}
                dayFormat={dayFormat} monthFormat={monthFormat}
                 duration={dur} images={imageData} alt={altData} id={buzz._id} liked={buzz.liked}
                 disliked={buzz.disliked}
                 />
              </li>
            );
       });
  }
 return (

      <div className={styles.mainDiv}>
      <h4 className={styles.heading}><i className="fa fa-at"></i>Recent Buzz</h4>
      <ul className={styles.List}>
      <InfiniteScroll
              loadMore={this.getBuzz}
              hasMore={this.state.hasMore}
              loader={<Loader key={1}/>}
              useWindow={false}
              initialLoad={false}
        >
      {buzzData}
      </InfiniteScroll>
       </ul>
      </div>
    );
}

}

const mapStateToProps = (state) => {
  return {
    data: state.auth.token,
  };
};
// const mapStateToProps = (state) => {
//   // console.log(state.recentBuzz.recentBuzz);
//   return {
//    buzz:state.recentBuzz.recentBuzz?state.recentBuzz.recentBuzz.data:[],
//    skip:state.recentBuzz.recentBuzz?state.recentBuzz.recentBuzz.skip:0,
//    hasMore:state.recentBuzz.recentBuzz?state.recentBuzz.recentBuzz.hasMore:null,
//    error:state.recentBuzz.error
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getRecentBuzz: (skip,limit) => dispatch(actions.fetchBuzz(skip,limit))
//   };
// };
export default connect(mapStateToProps)(RecentBuzzData);