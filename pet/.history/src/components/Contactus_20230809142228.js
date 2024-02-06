import React from "react";
import NavComponent from "./navComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/css/contact.css";

const Contactus = () => {
  return (
    <div>
      <NavComponent />
      <h3>You are welcome to contact for us ~</h3>
      <Container>
        <Row>
          <Col>
            <p>
              please send email to there, our team will solve your question as
              soon as possible
            </p>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contactus;
