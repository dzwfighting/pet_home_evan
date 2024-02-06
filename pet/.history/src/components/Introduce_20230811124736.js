import React from "react";
import { Card } from "react-bootstrap";
import pets1 from "../styles/images/pets1.jpg";
import pets2 from "../styles/images/pets2.jpg";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap";
import "../styles/css/introduce.css";

const Introduce = () => {
  const [ifShow, setIfShow] = useState("false");
  console.log(ifShow);
  const handlePageShow = () => {
    setIfShow(!ifShow);
  };
  return (
    <Container>
      <Container className="introduceCard">
        <Card className="bg-dark text-white">
          <img src={pets2} alt="Card image" />
          <Card.ImgOverlay>
            <h3 className="introduceCardTitle">Who we are</h3>
            <p className="introduceCardText">
              This is a wider card with supporting text below as a natural
              lead-in to additional content.
            </p>
            <div className="introduceCardButton">
              {ifShow ? (
                <Button variant="light" onClick={handlePageShow}>
                  Know More
                </Button>
              ) : (
                <Button variant="light" onClick={handlePageShow}>
                  Less More
                </Button>
              )}
            </div>
          </Card.ImgOverlay>
        </Card>
      </Container>

      {ifShow ? (
        <div></div>
      ) : (
        <div className="introduceCard">
          <Card className="bg-dark text-white">
            <Card.Img src={pets2} alt="Card image" />
            <Card.ImgOverlay>
              <Card.Text>
                <p className="introduceCardText">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer. This is a wider card with supporting text below as a
                  natural lead-in to additional content. This content is a
                  little bit longer. This is a wider card with supporting text
                  below as a natural lead-in to additional content. This content
                  is a little bit longer. This is a wider card with supporting
                  text below as a natural lead-in to additional content. This
                  content is a little bit longer.
                </p>
              </Card.Text>
              <div className="introduceCardButton">
                <Button variant="light" onClick={handlePageShow}>
                  Less More
                </Button>
              </div>
            </Card.ImgOverlay>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default Introduce;
