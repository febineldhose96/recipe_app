import React, { useState } from "react";
import "./styles.css";
import { FcMenu } from "react-icons/fc";
import { Button, Col, Container, Row } from "reactstrap";
import { toastController } from "../../../Components/ToastWidget";
const pricingArray = [
  {
    name: "Free Access (Freemium Model)",
    isBuyable: false,
    description:
      "Provide free access to a selection of basic recipes and content to attract a wide audience. Simultaneously, offer a premium subscription model at a monthly or yearly fee, granting users exclusive benefits like access to advanced recipes, ad-free browsing, personalized meal planning, and cooking tips from renowned chefs.",
  },
  {
    name: "Ad-Supported Free Content",
    isBuyable: true,
    description:
      "Keep the core content free for all users by displaying ads on your website. Generate revenue through ad impressions and clicks. For an ad-free experience, offer a premium subscription tier at a monthly fee. This way, users can choose whether they prefer an ad-supported or ad-free experience.",
  },
  {
    name: "One-Time Purchase",
    isBuyable: true,
    description:
      "Offer individual premium recipe collections or cooking courses for a one-time purchase price. You can buy access to specialized content, such as holiday recipes, international cuisines, or advanced cooking techniques. This allows You to pay only for the content you are interested in.",
  },
];
const Pricing = ({}) => {
  return (
    <Container fluid className="pricing-main-view" sm={12}>
      <h3 className="pricing-main-text">
        Prici<span className="pricing-main-text-green">ng</span>
      </h3>
      <Row className="pricing-list-row-style">
        {pricingArray.map((item, index) => {
          return (
            <Col className="pricing-item-style" key={index}>
              <h3>{item.name}</h3>
              <Col className="launcher-home-about-us-long-txt">
                {item.description}
              </Col>
              {item.isBuyable ? (
                <Button
                  className="pricing-buynow-button "
                  onClick={() => {
                    toastController.info("Not available now");
                  }}
                >
                  BUY NOW
                </Button>
              ) : null}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Pricing;
