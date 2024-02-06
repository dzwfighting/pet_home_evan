import React from "react";
import { Card } from "react-bootstrap";
import natural1 from "../styles/images/natural1.jpg";

const Introduce = () => {
  return (
    <div>
      <Card className="bg-dark text-white">
        <Card.Img src={natural1} alt="Card image" height={500} width={window} />
        <Card.ImgOverlay>
          <Card.Title> Who we do</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
};

export default Introduce;
