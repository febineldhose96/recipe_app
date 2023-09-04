import React from "react";
import "./styles.css";

import { CardGroup, Col, Container, Input, InputGroup, List } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import IMAGE_ASSETS from "../../assets/images";
import { useSelector } from "react-redux";
import LandinHeader from "./LandinHeader";
function ScreenHeader({ type = "home", ...props }) {
  const state = useSelector((state) => state);
  const categories = state.categoryReducer.categories.filter(
    (e) => e.is_popular
  );
  if (type === "home")
    return (
      <Container className="s_header_main" fluid>
        <Col sm={10}>
          <CardGroup className="sh-card-wrapper1">
            <img
              src={IMAGE_ASSETS.person_icon}
              height={20}
              width={20}
              alt="user-img"
            />
            <label className="sh-user-name">User name</label>
            <label className="sh-log-out">Logout</label>
            <img
              src={IMAGE_ASSETS.logout_icon}
              height={20}
              width={20}
              alt="logout-img"
            />
          </CardGroup>
        </Col>
        <Col sm={6} className="sh-search-wrapper">
          <InputGroup>
            <Input
              placeholder="Search recipes..."
              className="sh-search-input"
            />
            <FaSearch className="sh-search-icon" />
          </InputGroup>
        </Col>
        <List className="sh-list">
          {[...categories, ...categories].map((item) => (
            <div className="sh-list-item">{item.name}</div>
          ))}
        </List>
      </Container>
    );
  else if (type === "launcher") return <LandinHeader {...props} />;
  else return null;
}

export default ScreenHeader;
