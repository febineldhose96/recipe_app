import React, { useState } from "react";
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
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import DropDown from "../../../Components/DropDown";
export default function CategoryHeader({
  show = true,
  onSearch = () => {},
  onCategoryChanges = () => {},
}) {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const popular_categories = state.categoryReducer.categories.filter(
    (e) => e.is_popular
  );
  const categories = state.categoryReducer.mealType;
  const [filters, setFilters] = useState({
    mealType: {},
    dietType: {},
    cusineType: {},
  });
  const handleInputs = (type, event) => {
    setFilters((e) => ({ ...e, [type]: event }));
    onCategoryChanges(event);
  };
  if (show)
    return (
      <Container className="caegory_header_main" fluid>
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
              onChange={onSearch}
            />
            <FaSearch className="sh-search-icon" />
          </InputGroup>
        </Col>
        <Row>
          <Col sm={2}>
            <DropDown
              placeholder={"Select DietType"}
              parallelText="DietType"
              data={categories}
              dropButtonStyles="up_drop_butn_styles"
              id={`dropdown-variants-secondary`}
              selectedItem={filters.dietType}
              onItemClick={(e) => handleInputs("dietType", e)}
            />
          </Col>
          <Col sm={2}>
            <DropDown
              placeholder={"Select MealType"}
              parallelText="Mealtype"
              data={categories}
              dropButtonStyles="up_drop_butn_styles"
              id={`dropdown-variants-secondary`}
              selectedItem={filters.mealType}
              onItemClick={(e) => handleInputs("mealType", e)}
            />
          </Col>
          <Col sm={2}>
            <DropDown
              placeholder={"Select cusineType"}
              parallelText="CusineType"
              data={categories}
              dropButtonStyles="up_drop_butn_styles"
              id={`dropdown-variants-secondary`}
              selectedItem={filters.cusineType}
              onItemClick={(e) => handleInputs("cusineType", e)}
            />
          </Col>
          <Col
            sm={2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              style={{ background: "green", fontWeight: "bold" }}
              onClick={() => {
                onCategoryChanges({ id: 0 });
                setFilters((e) => ({
                  dietType: {},
                  mealType: {},
                  cusineType: {},
                }));
              }}
            >
              Reset Filter
            </Button>
          </Col>
        </Row>
      </Container>
    );
  else return null;
}
