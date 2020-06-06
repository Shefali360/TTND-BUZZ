import React from 'react';
import styles from './ComplaintPopup.module.css';


const ComplaintPopup=(props)=>{
    const complaint = props.complaint;
    return(
        <div className={styles.popup}>
            <p>{complaint.date}</p>
            <h2>{complaint.issueId}</h2>
            <p>{complaint.assignedTo}</p>
            <span>{complaint.department}{complaint.issue}</span>
            <p>{complaint.status}</p>
            <p>{complaint.concern}</p>   
        </div>
    );
}

export default ComplaintPopup;
