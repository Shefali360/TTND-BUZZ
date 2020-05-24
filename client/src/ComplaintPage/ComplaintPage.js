import React from "react";
import Complaintbox from './ComplaintBox/ComplaintBox';
import ComplaintsList from "./ComplaintsList/ComplaintsList";

const ComplaintPage = (props) => {
  return (
    <div>
          <Complaintbox/>
          <ComplaintsList/>
        </div>
  );
};

export default ComplaintPage;
