import React from "react";
import { useParams } from "react-router-dom";

import { Card, CardHeader, CardBody, CardText } from "reactstrap";
import NavComponent from "./navComponent";

const Error = () => {
  const { message } = useParams();
  console.log(message);
  return (
    <div>
      <NavComponent />
      <Card
        className="my-2"
        color="info"
        inverse
        style={{
          marginLeft: "50px",
          top: "70px",
          width: "50rem",
          height: "10rem",
        }}
      >
        <CardHeader>Error Message</CardHeader>
        <CardBody style={{ marginTop: "30px" }}>
          <CardText>{message}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Error;
