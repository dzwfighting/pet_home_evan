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
      <Card className="my-2 errorCard" color="info" inverse>
        <CardHeader>Error Message</CardHeader>
        <CardBody>
          <CardText>{message}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Error;
