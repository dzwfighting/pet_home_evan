import React from "react";
import NavComponent from "./navComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/css/contact.css";
import cat11 from "../styles/images/cat11-removebg-preview.png";

const Contactus = () => {
  return (
    <div>
      <NavComponent />
      <h3>You are welcome to contact for us ~</h3>
      <Container className="containerSet">
        <Row>
          <Col sm={8}>
            <p>
              please send email to there, our team will solve your question as
              soon as possible
            </p>
            <img src={cat11} className="imgSet" />
            <div className="emailBlock">
              <p className="emailP">petteam1234@gmail.com</p>
            </div>
          </Col>
          <Col sm={4} className="imgSize">
            <img src={cat11} className="imgSet" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contactus;
