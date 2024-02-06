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
      <div className="contactContainerSet">
        <h3>You are welcome to contact for us ~</h3>
        <p>
          please send email to there, our team will solve your question as soon
          as possible
        </p>
        <div className="emailBlock">petteam1234@gmail.com</div>
      </div>
    </div>
  );
};

export default Contactus;
