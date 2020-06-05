import React from 'react';
import CreateBuzz from '../../containers/CreateBuzz/CreateBuzz';
import RecentBuzz from '../../containers/RecentBuzz/RecentBuzz';

const BuzzPage=(props)=>{
    return(
        <div> 
            <CreateBuzz/>
            <RecentBuzz/>
        </div>
    );
}

export default BuzzPage;