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
      <Card className="my-2 errorCard" color="info" inverse>
        <CardHeader>
          <h2>Error Message</h2>
        </CardHeader>
        <div className="errormsg">
          <CardText>{message}</CardText>
        </div>
      </Card>
    </div>
  );
};

export default Error;
