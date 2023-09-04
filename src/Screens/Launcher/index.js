import React, { Fragment, useRef, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { NAV_SCREENS } from "../../Navigations/config";
import ScreenHeader from "../../Components/ScreenHeader";
import { Col, Container, Nav, NavItem, Row } from "reactstrap";
import SideDrawer from "./SideDrawer";
import IMAGE_ASSETS from "../../assets/images";
import Pricing from "./Pricing";
import ContactUs from "./ContactUs";
export default function Launcher(params) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const homeRef = document.getElementById("home");
  const aboutRef = document.getElementById("about");
  const priceRef = document.getElementById("pricing");
  const contactRef = document.getElementById("contact");
  const handleNavItemClick = (item) => {
    if (item === "home") {
      homeRef.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (item === "about") {
      aboutRef.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (item === "pricing") {
      priceRef.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (item === "contact") {
      contactRef.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <Container className="p-0 launcher-container" fluid>
      <ScreenHeader
        type="launcher"
        isDrawerOpen={sidebarOpen}
        onNavItemClick={handleNavItemClick}
        onHambugerClick={() => setSidebarOpen(!sidebarOpen)}
      />
      <SideDrawer
        sidebarOpen={sidebarOpen}
        onDrawerItemClick={handleNavItemClick}
      />
      <Row id="home">
        <Col sm="6">
          <Col className="launcher-home-heading">
            Learn To <Col className="launcher-home-heading-green">Cook</Col>{" "}
            With These <Col className="launcher-home-heading-green">Easy</Col>{" "}
            Recipes
          </Col>
          <Col>
            <p className="launcher-home-text-bold-1">
              "Explore a world of culinary delights on our recipe website.
              Discover an extensive collection of mouthwatering recipes, from
              quick and easy weeknight dinners to gourmet delights. Whether
              you're a seasoned chef or a beginner in the kitchen, our website
              offers inspiration, tips, and step-by-step guides to elevate your
              cooking journey."
            </p>
          </Col>
        </Col>
        <Col sm="6">
          <img
            src={IMAGE_ASSETS.landinpage_1}
            width="100%"
            className="launcher-home-image1"
          />
          <div className="launcher-home-imagesetup">
            <img
              src={IMAGE_ASSETS.landinpage_2}
              className="launcher-home-image2"
            />

            <img
              src={IMAGE_ASSETS.landinpage_3}
              className="launcher-home-image3"
            />
            <img
              src={IMAGE_ASSETS.landinpage_4}
              className="launcher-home-image4"
            />
            <img
              src={IMAGE_ASSETS.landinpage_5}
              className="launcher-home-image5"
            />
            <img
              src={IMAGE_ASSETS.landinpage_6}
              className="launcher-home-image6"
            />
            <img
              src={IMAGE_ASSETS.landinpage_7}
              className="launcher-home-image7"
            />
          </div>
        </Col>
      </Row>
      <Row id="about">
        <Col sm="6">
          <img src={IMAGE_ASSETS.landinpage_about} width={"90%"} />
        </Col>
        <Col sm="6">
          <Col sm={6} className="launcher-home-about-us">
            About<Col className="launcher-home-heading-green">Us</Col>{" "}
          </Col>
          <Col className="launcher-home-about-us-long-txt">
            Welcome to Chef Mate, your ultimate culinary companion in the world
            of cooking and gastronomy. Our mission is to inspire and empower
            both novice and seasoned chefs alike to embark on flavorful journeys
            through the art of cooking. At Recipe Chef, we curate a diverse
            range of delectable recipes that cater to all tastes and skill
            levels. From classic comfort foods to international cuisines, our
            website is a treasure trove of culinary inspiration. Our dedicated
            team of experienced chefs and food enthusiasts brings you
            meticulously crafted recipes, along with expert tips, step-by-step
            tutorials, and informative articles. We believe that cooking is a
            universal language that connects people through the joy of sharing a
            delicious meal. Join us on this culinary adventure, and let's savor
            the magic of cooking together. Recipe Chef is not just a website;
            it's your trusted cooking companion in the kitchen.
          </Col>
        </Col>
      </Row>

      <Row id="pricing">
        <Pricing />
      </Row>
      <Row id="contact">
        <ContactUs />
      </Row>
    </Container>
  );
}
