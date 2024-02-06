import React from "react";
import { useParams } from "react-router-dom";

import { Card, CardHeader, CardBody, CardText } from "reactstrap";
import NavComponent from "./navComponent";
import "../styles/css/error.css";

const Error = () => {
  const { message } = useParams();
  console.log(message);
  return (
    <div>
      <NavComponent />
      <div className="errorCard">
        <Card className="my-2 " color="info" inverse>
          <CardHeader>Error Message</CardHeader>
          <CardBody>
            <CardText>{message}</CardText>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Error;
