import React from "react";
import {
  CardGroup,
  CloseButton,
  Col,
  Container,
  Input,
  InputGroup,
  List,
  Nav,
  NavItem,
  Row,
  Button,
} from "reactstrap";
import IMAGE_ASSETS from "../../../assets/images";
import "./styles.css";
import { TbMenu } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSearch, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import DropDown from "../../../Components/DropDown";
export default function ProfileHeader({
  show = true,
  userDetails = {},
  onLogout = () => {},
  onEditProfile = () => {},
}) {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  if (show)
    return (
      <Container className="caegory_header_main" fluid>
        <Col sm={10}>
          <CardGroup className="sh-card-wrapper1">
            <label className="sh-log-out" onClick={onLogout}>
              Logout
            </label>
            <img
              src={IMAGE_ASSETS.logout_icon}
              height={20}
              width={20}
              alt="logout-img"
              onClick={onLogout}
            />
          </CardGroup>
        </Col>
        <Row>
          <Row>
            <img
              src={userDetails.profile_imageUrl}
              style={{
                width: 150,
                borderRadius: 104,
                objectFit: "cover",
                marginLeft: 10,
              }}
            />
            <Col>
              <Col style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
                {" "}
                {userDetails.username}
              </Col>
              <Col style={{ color: "white", fontSize: 15 }}>
                <FaStar color="yellow" /> <FaStar color="yellow" />{" "}
                <FaStar
                  color="yellow"
                  onClick={() => {
                    alert(userDetails.profile_imageUrl);
                  }}
                />{" "}
                3 user
              </Col>
              <FaEdit
                onClick={onEditProfile}
                style={{
                  marginTop: 10,
                  color: "green",
                  fontSize: 20,
                  marginLeft: 12,
                  marginBottom: 10,
                }}
              ></FaEdit>
            </Col>
          </Row>
        </Row>
      </Container>
    );
  else return null;
}
