import React from 'react';
import CreateBuzz from './CreateBuzz/CreateBuzz';
import RecentBuzz from './RecentBuzz/RecentBuzz';

const BuzzPage=(props)=>{
    return(
        <div> 
            <CreateBuzz/>
            <RecentBuzz/>
        </div>
    );
}

export default BuzzPage;