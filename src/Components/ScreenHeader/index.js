import React from "react";
import "./styles.css";

import { CardGroup, Col, Container, Input, InputGroup, List } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import IMAGE_ASSETS from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import LandinHeader from "./LandinHeader";
import CategoryHeader from "./CategoryHeader";
import ProfileHeader from "./ProfileHeader";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/config";
import { NAV_SCREENS } from "../../Navigations/config";
import { toastController } from "../ToastWidget";
import { Messages } from "../../Config/messages";
import { onLogout } from "../../Screens/Profile/reducer";
function ScreenHeader({
  type = "home",
  onCategoryChanges = () => {},
  onSearch = () => {},
  ...props
}) {
  const state = useSelector((state) => state);
  const user = state.profileReducer.userDetails;
  const categories = state.categoryReducer.categories.filter(
    (e) => e.is_popular
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userdata");
    const options = {
      isLoggedIn: false,
      isLoading: false,
    };
    auth
      .signOut()
      .then((succ) => {
        navigate(NAV_SCREENS.home, { replace: true });
        window.history.replaceState(null, NAV_SCREENS.profile);
        toastController.success(Messages.success_Messages.logout);
        dispatch(onLogout(options));
      })
      .catch((e) => {
        dispatch(onLogout({ isLoading: false }));
        toastController.error(Messages.error_Messages.normal);
      });
  };
  if (type === "home")
    return (
      <Container className="s_header_main" fluid>
        <Col sm={10}>
          <CardGroup className="sh-card-wrapper1">
            <img
              src={user.profile_imageUrl}
              style={{ height: 30, width: 30, borderRadius: 20 }}
              alt="user-img"
            />
            <label className="sh-user-name">{user.username}</label>
            <label className="sh-log-out" onClick={handleLogout}>
              Logout
            </label>
            <img
              src={IMAGE_ASSETS.logout_icon}
              height={20}
              width={20}
              alt="logout-img"
              onClick={handleLogout}
            />
          </CardGroup>
        </Col>
        <Col sm={6} className="sh-search-wrapper">
          <InputGroup>
            <Input
              placeholder="Search recipes..."
              className="sh-search-input"
              onChange={onSearch}
            />
            <FaSearch className="sh-search-icon" />
          </InputGroup>
        </Col>
        <List className="sh-list">
          {[{ id: 0, name: "All" }, ...categories].map((item) => (
            <div
              className="sh-list-item"
              onClick={() => onCategoryChanges(item)}
            >
              {item.name}
            </div>
          ))}
        </List>
      </Container>
    );
  else if (type === "launcher")
    return (
      <LandinHeader
        {...props}
        userDetails={user}
        onSearch={onSearch}
        onLogout={handleLogout}
        onCategoryChanges={onCategoryChanges}
      />
    );
  else if (type === "category")
    return (
      <CategoryHeader
        {...props}
        userDetails={user}
        onSearch={onSearch}
        onLogout={handleLogout}
        onCategoryChanges={onCategoryChanges}
      />
    );
  else if (type === "profile")
    return (
      <ProfileHeader
        {...props}
        userDetails={user}
        onSearch={onSearch}
        onLogout={handleLogout}
        onCategoryChanges={onCategoryChanges}
      />
    );
  else return null;
}

export default ScreenHeader;
