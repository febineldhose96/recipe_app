import React from "react";
import { CloseButton, Col, Container, Nav, NavItem, Row } from "reactstrap";
import IMAGE_ASSETS from "../../../assets/images";
import "./styles.css";
import { TbMenu } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
export default function LandinHeader({
  show = true,
  isDrawerOpen = false,
  onNavItemClick = () => {},
  onHambugerClick = () => {},
}) {
  const navigate = useNavigate();
  if (show)
    return (
      <Container className="lh-main-container" fluid>
        <Row className="m-0">
          <Col sm={4}>
            {isDrawerOpen ? (
              <MdClose
                className="lh-handburger-menu"
                onClick={onHambugerClick}
              />
            ) : (
              <TbMenu
                className="lh-handburger-menu"
                onClick={onHambugerClick}
              />
            )}
            <img src={IMAGE_ASSETS.logo} className="lh-logo-style" />
          </Col>
          <Col sm={8}>
            <Nav className="lh-nav-main-style">
              <NavItem
                className="lh-nav-item-style"
                onClick={() => onNavItemClick("home")}
              >
                Home
              </NavItem>
              <NavItem
                className="lh-nav-item-style"
                onClick={() => onNavItemClick("about")}
              >
                About us
              </NavItem>
              <NavItem
                className="lh-nav-item-style"
                onClick={() => onNavItemClick("pricing")}
              >
                Pricing
              </NavItem>
              <NavItem
                className="lh-nav-item-style"
                onClick={() => onNavItemClick("contact")}
              >
                Contact us
              </NavItem>
              <NavItem
                className="lh-nav-item-style"
                onClick={() => navigate("/login")}
              >
                Login <img src={IMAGE_ASSETS.logout_icon} height={20} />
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
    );
  else return null;
}
