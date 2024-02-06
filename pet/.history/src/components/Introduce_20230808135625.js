import React from "react";
import { Card } from "react-bootstrap";
import natural1 from "../styles/images/natural1.jpg";
import { useState } from "react";
import Button from "react-bootstrap/Button";

const Introduce = () => {
  const [ifShow, setIfShow] = useState("false");
  const handlePageShow = () => {
    setIfShow(!ifShow);
  };
  return (
    <div>
      <Card className="bg-dark text-white">
        <Card.Img src={natural1} alt="Card image" height={600} width={window} />
        <Card.ImgOverlay>
          <Card.Title> Who we do</Card.Title>
          <Button variant="light" onClick={handlePageShow}>
            Light
          </Button>
        </Card.ImgOverlay>
      </Card>
      ifShow ?{" "}
      <div>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer. This is a wider
        card with supporting text below as a natural lead-in to additional
        content. This content is a little bit longer. This is a wider card with
        supporting text below as a natural lead-in to additional content. This
        content is a little bit longer. This is a wider card with supporting
        text below as a natural lead-in to additional content. This content is a
        little bit longer.
      </div>
      : <div></div>
    </div>
  );
};

export default Introduce;
