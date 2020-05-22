import React from 'react';
import Topdiv from './topDiv/topDiv';
import Sidebar from './sideBar/sideBarItems/sideBarItems';
import CreateBuzz from './createBuzz/createBuzz';
import styles from './buzzPage.module.css';
import RecentBuzz from './recentBuzz/recentBuzz';

const buzzPage=(props)=>{
    return(
        <div>
            <Topdiv text="Creating buzz around you have never been so easy.."/>
            <div className={styles.post}>
            <div className={styles.leftDiv}>
            <Sidebar/>
            </div>
            <div className={styles.rightDiv}>
            <CreateBuzz/>
            <RecentBuzz/>
            </div>
            </div>
        </div>
    );
}

export default buzzPage;