import React, { useCallback, useState } from "react";
import "./styles.css";
import { NAV_SCREENS } from "../../Navigations/config";
import { useNavigate } from "react-router-dom";
import { AiFillHome, AiFillHeart } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { Container, Nav, NavItem } from "reactstrap";
import IMAGE_ASSETS from "../../assets/images";
function Header({ onTabChanges = () => {} }) {
  const [headerProps, setHeaderProps] = useState([
    {
      name: "Home",
      active: true,
      page: NAV_SCREENS.home,
      url: IMAGE_ASSETS.home_icon,
    },
    {
      name: "Category",
      active: false,
      page: NAV_SCREENS.category,
      url: IMAGE_ASSETS.category_icon,
    },
    {
      name: "Create",
      active: false,
      page: NAV_SCREENS.uploadrecipe,
      url: IMAGE_ASSETS.create_icon,
    },
    {
      name: "Saved",
      active: false,
      page: NAV_SCREENS.savedRecipes,
      url: IMAGE_ASSETS.fav_icon,
    },
    {
      name: "Profile",
      active: false,
      page: NAV_SCREENS.profile,
      url: IMAGE_ASSETS.person_icon,
    },
  ]);
  const navigate = useNavigate();
  const handleIndicator = useCallback(
    (_data, i) => {
      setHeaderProps((e) => e.map((_e, _i) => ({ ..._e, active: i === _i })));
      onTabChanges();
      navigate(_data.page);
    },
    [setHeaderProps, onTabChanges, navigate]
  );
  return (
    <Container fluid className="header_main">
      <img src={IMAGE_ASSETS.logo} className="header_logo_" alt="logo" />
      <Nav className="header_nav">
        {headerProps.map((_props, index) => {
          return (
            <NavItem
              key={index}
              onClick={() => handleIndicator(_props, index)}
              className="nav_item"
            >
              <img className="header_nav_icon" src={_props.url} />
              <div
                className={
                  _props.active
                    ? "header_nav_name_active"
                    : "header_nav_name_inactive"
                }
              >
                {_props.name}
              </div>
            </NavItem>
          );
        })}
      </Nav>
    </Container>
  );
}

export default Header;
