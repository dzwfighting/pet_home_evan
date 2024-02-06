import React from "react";
import NavComponent from "./navComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/css/contact.css";
import cat2 from "../styles/images/cat2.jpg";

const Contactus = () => {
  return (
    <div>
      <NavComponent />
      <h3>You are welcome to contact for us ~</h3>
      <Container>
        <Row className="justify-content-md-center">
          <Col sm={8}>
            <p>
              please send email to there, our team will solve your question as
              soon as possible
            </p>
          </Col>
          <Col sm={4} className="imgSize">
            <img src={cat2} className="imgSet" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contactus;
