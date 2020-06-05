import React from 'react';


const ComplaintPopup=(props)=>{
    return(
        <div>
            <p>{props.date}</p>
            <h2>{props.issueId}</h2>
            <p>{props.assignedTo}</p>
            <span>{props.department}{props.issue}</span>
            <p>{props.status}</p>
            <p>{props.concern}</p>   
        </div>
    );
}

export default ComplaintPopup;
