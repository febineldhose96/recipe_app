import React, { useState } from "react";
import "./styles.css";
import { FcMenu } from "react-icons/fc";
import { Button, Col, Container, Form, Input, Row } from "reactstrap";
import IMAGE_ASSETS from "../../../assets/images";
import { toastController } from "../../../Components/ToastWidget";

const ContactUs = ({}) => {
  return (
    <Container fluid className="pricing-main-view" sm={12}>
      <h3 className="pricing-main-text">
        Contact
        <span className="pricing-main-text-green" style={{ marginLeft: 10 }}>
          Us
        </span>
      </h3>
      <Row className="pricing-list-row-style">
        <Col>
          <form>
            <Input
              required
              className="contact-us-input"
              placeholder="Name..........."
            />{" "}
            <Input
              required
              className="contact-us-input"
              placeholder="Email..........."
            />{" "}
            <Input
              required
              className="contact-us-input"
              placeholder="Message..........."
            />
            <Button
              className="contact-us-save-button"
              onClick={() => {
                toastController.success(
                  "Your response saved...we will get in touch with you"
                );
              }}
            >
              Save
            </Button>
          </form>
        </Col>
        <Col className="contact-us-row-1 ">
          <Row style={{ marginBottom: 10 }}>
            <Col sm={2}>
              <img
                src={IMAGE_ASSETS.landinpage_location}
                width={20}
                height={20}
                style={{ objectFit: "contain" }}
              />
            </Col>
            <Col>Chef Mate, Charlot Street, London,Uk</Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <img src={IMAGE_ASSETS.landinpage_phone} style={{ width: 40 }} />
            <Col>+44 0780934568</Col>
          </Row>
          <Row>
            <Col sm={2} style={{ marginBottom: 10 }}>
              <img
                src={IMAGE_ASSETS.landinpage_email}
                width={20}
                height={20}
                style={{ objectFit: "contain" }}
              />
            </Col>
            <Col>chefmatepal@co.uk</Col>
          </Row>
          <Row>
            <Col className="contact-follow-us-on-text">Follow us on</Col>
            <Row>
              <img src={IMAGE_ASSETS.landinpage_10} style={{ width: 40 }} />{" "}
              <img src={IMAGE_ASSETS.landinpage_8} style={{ width: 40 }} />{" "}
              <img src={IMAGE_ASSETS.landinpage_9} style={{ width: 40 }} />
              <img src={IMAGE_ASSETS.landinpage_11} style={{ width: 40 }} />
              <img src={IMAGE_ASSETS.landinpage_12} style={{ width: 40 }} />
            </Row>
          </Row>
        </Col>
      </Row>
      <Row className="contact-us-footer">copyright@chefmate 2023</Row>
    </Container>
  );
};

export default ContactUs;
