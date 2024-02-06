import React from "react";
import { Card } from "react-bootstrap";
import back1 from "../styles/images/back1.jpg";
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
        <div className="bgSet">
          <h3 className="introduceCardTitle">Who we are</h3>
          <p className="introduceCardText">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          {ifShow ? (
            <Button
              variant="light"
              onClick={handlePageShow}
              className="introbtnSet"
            >
              Know More
            </Button>
          ) : (
            <Button
              variant="light"
              onClick={handlePageShow}
              className="introbtnSet"
            >
              Less More
            </Button>
          )}
        </div>
      ) : (
        <div className="bgSet">
          <p className="moreintroduceCardText">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer. This is
            a wider card with supporting text below as a natural lead-in to
            additional content. This content is a little bit longer. This is a
            wider card with supporting text below as a natural lead-in to
            additional content. This content is a little bit longer. This is a
            wider card with supporting text below as a natural lead-in to
            additional content. This content is a little bit longer.
          </p>
          <Button
            variant="light"
            onClick={handlePageShow}
            className="introbtnSet"
          >
            Less More
          </Button>
        </div>
      )}
    </div>
  );
};

export default Introduce;
