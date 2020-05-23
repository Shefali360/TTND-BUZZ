import React from "react";
import Topdiv from "../buzzPage/topDiv/topDiv";
import Sidebar from "../buzzPage/sideBar/sideBarItems/sideBarItems";
import Complaintbox from '../complaintPage/complaintBox/complaintBox';
import sharedStyles from "../buzzPage/buzzPage.module.css";
import ComplaintsList from "../complaintPage/complaintsList/complaintsList";

const complaintPage = (props) => {
  return (
    <div>
      <Topdiv text="Lodging complaints have never been so easy.." />
      <div className={sharedStyles.post}>
        <div className={sharedStyles.leftDiv}>
          <Sidebar />
        </div>
        <div className={sharedStyles.rightDiv}>
          <Complaintbox/>
          <ComplaintsList/>
        </div>
      </div>
    </div>
  );
};

export default complaintPage;
