import React from "react";
import Topdiv from "../buzzPage/topDiv/topDiv";
import Sidebar from "../buzzPage/sideBar/sideBarItems/sideBarItems";

const complaintPage = (props) => {
  return (
    <div>
      <Topdiv text="Lodging complaints have never been so easy.." />
      <div>
        <div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default complaintPage;
