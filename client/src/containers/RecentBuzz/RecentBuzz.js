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
    hasMore:false,
    spinner:true
  }

  limit= 5;
  mounted=true;

  getBuzz=(skip)=>{

    axios
      .get(
        `http://localhost:3030/buzz?skip=${skip}&limit=${this.limit}`, {headers:{"authorization":`Bearer ${this.props.data.access_token},Bearer ${this.props.data.id_token} `}}
      ).then((res)=>{
        const buzz = Array.from(this.state.buzz);
        buzz.push(...res.data);
        this.mounted&&this.setState({
          buzz: buzz,
          skip:skip + 5,
          hasMore:!(res.data.length<this.limit),
          spinner:false})
      }).catch((err)=>{
        this.mounted&&this.setState({error:true,spinner:false})
      })
  }
  
  componentDidMount() {
    this.getBuzz(this.state.skip);
    this.mounted=true;
  }
  componentWillUnmount(){
    this.mounted=false;
    
  }

  componentDidUpdate(prevProps){
    if(this.props.submitted.submitted>prevProps.submitted.submitted){
      this.mounted&&this.setState({buzz:[],spinner:true})
    this.getBuzz(0);}
  }

  render() {
    let buzzData=null;
    if(this.state.spinner){
      buzzData=<Spinner/>
    }else if(this.state.error){
      buzzData=<div className={styles.errorContainer}>
        <i className={["fa fa-exclamation-triangle",styles.error].join(' ')}>
          <span >Buzz data can't be loaded!</span>
          </i>
          </div>
    }
     else if (this.state.buzz.length===0)
    {
       buzzData=<p>No buzz going around.You need to post something to create one!</p>
     }else{
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
      const year=d.getFullYear();
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
                 disliked={buzz.disliked} yearFormat={year}
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
              loadMore={()=>this.getBuzz(this.state.skip)}
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