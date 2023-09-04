import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./styles.css";
import { FcMenu } from "react-icons/fc";

const SideDrawer = ({ sidebarOpen = false, onDrawerItemClick = () => {} }) => {
  return (
    <div className="home">
      <Sidebar
        isOpen={sidebarOpen}
        onClickItem={(e) => {
          onDrawerItemClick(e);
        }}
      />
    </div>
  );
};

export default SideDrawer;
