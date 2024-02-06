import React from "react";
import { Card } from "react-bootstrap";
import pets2 from "../styles/images/pets2.jpg";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "../styles/css/introduce.css";

const Introduce = () => {
  const [ifShow, setIfShow] = useState("false");
  console.log(ifShow);
  const handlePageShow = () => {
    setIfShow(!ifShow);
  };
  return (
    <div className="introduceCard">
      {ifShow ? (
        <Card className="bgSet">
          <img src={pets2} alt="Card image" className="ImgSet" />
          <Card.ImgOverlay>
            <h3 className="introduceCardTitle">Who we are</h3>
            <p className="introduceCardText">
              This is a wider card with supporting text below as a natural
              lead-in to additional content.
            </p>
            {ifShow ? (
              <Button
                variant="light"
                onClick={handlePageShow}
                className="introbtnSet"
              >
                <p>Know More</p>
              </Button>
            ) : (
              <Button
                variant="light"
                onClick={handlePageShow}
                className="introbtnSet"
              >
                <p>Less More</p>
              </Button>
            )}
          </Card.ImgOverlay>
        </Card>
      ) : (
        <Card className="bgSet">
          <img src={pets2} alt="Card image" className="ImgSet" />
          <Card.ImgOverlay>
            <p className="introduceCardText">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer. This is a wider card with supporting text below as a
              natural lead-in to additional content. This content is a little
              bit longer. This is a wider card with supporting text below as a
              natural lead-in to additional content. This content is a little
              bit longer. This is a wider card with supporting text below as a
              natural lead-in to additional content. This content is a little
              bit longer.
            </p>
            <Button
              variant="light"
              onClick={handlePageShow}
              className="introbtnSet"
            >
              <p>Less More</p>
            </Button>
          </Card.ImgOverlay>
        </Card>
      )}
    </div>
  );
};

export default Introduce;
