import React from 'react';
import Topdiv from '../topDiv/topDiv';
import Verticalnav from '../verticalNav/verticalNavItems/verticalNavItems';

const wholePage=(props)=>{
    return(
        <div>
            <Topdiv text="Creating buzz around you have never been so easy.."/>
            <Verticalnav/>
        </div>
    );
}

export default wholePage;