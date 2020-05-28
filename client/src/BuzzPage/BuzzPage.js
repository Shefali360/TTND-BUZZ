import React from 'react';
import CreateBuzz from './CreateBuzz/CreateBuzz';
import RecentBuzz from '../containers/RecentBuzz';

const BuzzPage=(props)=>{
    return(
        <div> 
            <CreateBuzz/>
            <RecentBuzz/>
        </div>
    );
}

export default BuzzPage;