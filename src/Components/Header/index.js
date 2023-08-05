import React, { useCallback, useState } from "react";
import "./styles.css";
import { NAV_SCREENS } from "../../Navigations/config";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiFillHeart } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";
import { BsPersonCircle, BsSearch } from "react-icons/bs";
function Header({ onTabChanges = () => {} }) {
  const [headerProps, setHeaderProps] = useState([
    { name: "Home", active: true, page: NAV_SCREENS.home, ICON: AiFillHome },
    {
      name: "Search",
      active: false,
      page: NAV_SCREENS.home,
      ICON: BsSearch,
    },
    {
      name: "Category",
      active: false,
      page: NAV_SCREENS.login,
      ICON: MdOutlineExplore,
    },
    {
      name: "Saved",
      active: false,
      page: NAV_SCREENS.home,
      ICON: AiFillHeart,
    },
    {
      name: "Create",
      active: false,
      page: NAV_SCREENS.uploadrecipe,
      ICON: BiBookAdd,
    },
    {
      name: "Profile",
      active: false,
      page: NAV_SCREENS.home,
      ICON: BsPersonCircle,
    },
  ]);
  const handleIndicator = useCallback(
    (_data, i) => {
      setHeaderProps((e) => e.map((_e, _i) => ({ ..._e, active: i === _i })));
      onTabChanges();
    },
    [setHeaderProps, onTabChanges]
  );
  return (
    <div className="header_main">
      <h3 className="header_logo_">Recipe Shef</h3>
      <nav className="header_nav">
        {headerProps.map(({ ICON, ..._props }, index) => {
          return (
            <div
              key={index}
              onClick={() => handleIndicator(_props, index)}
              className="nav_item"
            >
              <ICON className="header_nav_icon" />
              <NavLink
                to={_props.page}
                className={
                  _props.active
                    ? "header_nav_name_active"
                    : "header_nav_name_inactive"
                }
              >
                {_props.name}
              </NavLink>
            </div>
          );
        })}
      </nav>
    </div>
  );
}

export default Header;
