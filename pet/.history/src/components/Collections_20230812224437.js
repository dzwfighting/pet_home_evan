import React, { useEffect, useState } from "react";
import NavComponent from "./navComponent";
import { useSelector } from "react-redux";
import { findUserData } from "../fake-data/users";
import products from "../fake-data/products";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Input,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../styles/css/cart.css";

const Collections = () => {
  const [curUserCollections, setCurUserCollections] = useState(undefined);
  const curUser = useSelector((state) => state.curUser);
  const navigate = useNavigate();
  let card = null;

  useEffect(() => {
    if (curUser) {
      let temp = [];
      let allCurUserData = findUserData(curUser.email);
      let allCollections = allCurUserData.collections;
      for (let i = 0; i < allCollections.length; i++) {
        temp.push(products.filter((pro) => pro.id === allCollections[i])[0]);
        setCurUserCollections(temp);
        console.log(curUserCollections);
      }
    }
  }, [curUser]);

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  if (curUser && curUserCollections) {
    card = curUserCollections.map((pro) => {
      return (
        <div className="cartCardSet">
          <Card className="my-2">
            <Row>
              <Col xs="4">
                <CardImg
                  alt="Card image cap"
                  src={pro.image}
                  className="cartImg"
                />
              </Col>
              <Col xs="8">
                <CardBody>
                  <div className="cartTitle">
                    <CardTitle tag="h2" style={{ marginTop: "50px" }}>
                      {pro.title}
                    </CardTitle>
                  </div>

                  <Button
                    color="info"
                    onClick={() => handleClick(pro.id)}
                    className="details"
                  >
                    Details
                  </Button>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </div>
      );
    });
  }

  return (
    <div>
      <NavComponent />
      {card}
    </div>
  );
};

export default Collections;
