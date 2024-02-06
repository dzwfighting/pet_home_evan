import React from "react";
import { Card } from "react-bootstrap";
import natural1 from "../styles/images/natural1.jpg";
import natural2 from "../styles/images/natural2.jpg";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "../styles/css/introduce.css";

const Introduce = () => {
  const [ifShow, setIfShow] = useState("false");
  const handlePageShow = () => {
    setIfShow(!ifShow);
  };
  return (
    <div>
      <div className="introduceCard">
        <Card className="bg-dark text-white">
          <Card.Img
            src={natural1}
            alt="Card image"
            height={600}
            width={window}
          />
          <Card.ImgOverlay>
            <Card.Title>
              <p className="introduceCardTitle">Who we do</p>
            </Card.Title>
            <Card.Text>
              <p className="introduceCardText">
                This is a wider card with supporting text below as a natural
                lead-in to additional content.
              </p>
            </Card.Text>
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
      </div>

      <div className="introduceCard">
        {ifShow ? (
          <Card className="bg-dark text-white">
            <Card.Img
              src={natural1}
              alt="Card image"
              height={600}
              width={window}
            />
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
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Introduce;
