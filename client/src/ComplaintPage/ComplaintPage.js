import React from "react";
import Complaintbox from './ComplaintBox/ComplaintBox';
import ComplaintsList from "../containers/ComplaintList";

const ComplaintPage = (props) => {
  return (
    <div>
          <Complaintbox/>
          <ComplaintsList/>
        </div>
  );
};

export default ComplaintPage;
