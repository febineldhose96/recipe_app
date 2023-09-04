import React from "react";
import { FaHome } from "react-icons/fa";
import "./styles.css";
import { MdContactSupport, MdPriceChange } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
const Sidebar = ({ isOpen, onClickItem = () => {} }) => {
  return (
    <nav className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li onClick={() => onClickItem("home")}>
          <FaHome className="sidebar-icons" /> Home
        </li>
        <li onClick={() => onClickItem("about")}>
          <MdContactSupport className="sidebar-icons" /> About
        </li>
        <li onClick={() => onClickItem("home")}>
          <MdPriceChange className="sidebar-icons" /> Pricing
        </li>
        <li onClick={() => onClickItem("home")}>
          <FcAbout className="sidebar-icons" /> Contact us
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
