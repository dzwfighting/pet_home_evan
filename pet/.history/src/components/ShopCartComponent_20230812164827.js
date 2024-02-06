import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import users, { addCart, delOnePro } from "../fake-data/users";
import products from "../fake-data/products";
import NavComponent from "./navComponent";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../styles/css/cart.css";
import "remixicon/fonts/remixicon.css";

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Input,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const ShopCartComponent = (props) => {
  const [ifLogin, setIfLogin] = useState(false);
  const [ifUpdate, setIfUpdate] = useState(false);
  const [newUser, setNewUser] = useState(undefined);
  const [cartProdData, setCartProdData] = useState(undefined);
  const [totalPay, setTotalPay] = useState(0);
  // const [addCntProData, setAddCntProData] = useState(undefined);
  const { className } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleCheckout = () => {
    setModal(!modal);
    navigate("/");
  };

  const navigate = useNavigate();
  const curUser = useSelector((state) => state.curUser);
  let card = null;

  useEffect(() => {
    if (curUser) {
      setIfLogin(true);
      let temp = users.filter((user) => user.email === curUser.email)[0];
      console.log(temp);

      let newCartProd = [];
      for (let i = 0; i < temp.cart.length; i++) {
        let tempP = products.filter((p) => p.id === temp.cart[i].proId)[0];
        // console.log(temp.cart[i]);
        tempP.curCnt = temp.cart[i].cnt;
        console.log(tempP);
        newCartProd.push(tempP);
      }
      setNewUser(temp);
      setCartProdData(newCartProd);
      console.log(newCartProd);
      console.log(newUser);

      let tempTotal = 0;
      for (let i = 0; i < newCartProd.length; i++) {
        tempTotal =
          tempTotal + newCartProd[i].price * Number(newCartProd[i].curCnt);
      }
      setTotalPay(tempTotal);
      console.log(tempTotal);
    } else setIfLogin(false);
  }, [curUser, newUser, ifUpdate]);

  const handleAdd = (addProId) => {
    let afterAdd = addCart(curUser.email, addProId);
    setNewUser(afterAdd);
    console.log(afterAdd);
    console.log(newUser);
    // addPro.curCnt = (Number(afterAdd) + 1).toString();
    setIfUpdate(!ifUpdate);
  };

  const handleDel = (delPrId) => {
    let afterDel = delOnePro(curUser.email, delPrId);
    setNewUser(afterDel);
    console.log(afterDel);
    console.log(newUser);
    setIfUpdate(!ifUpdate);
  };

  if (newUser && newUser.cart) {
    card = cartProdData.map((pro) => {
      return (
        <div className="cardSet">
          <Card className="my-2">
            <Row>
              <Col xs="3">
                <CardImg
                  alt="Card image cap"
                  src={pro.image}
                  style={{
                    marginBottom: "10px",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Col>
              <Col xs="3">
                <CardBody>
                  <CardTitle
                    tag="h2"
                    style={{ marginTop: "50px", fontFamily: "cursive" }}
                  >
                    {pro.title}
                  </CardTitle>
                  <CardText style={{ marginTop: "120px" }}>
                    <span style={{ marginRight: "50px" }}>
                      <i
                        class="ri-add-line ri-2x"
                        onClick={() => handleAdd(pro.id)}
                      ></i>
                    </span>
                    <span className="inputSet">
                      <Input placeholder={Number(pro.curCnt)} />
                    </span>
                    <span>
                      <i
                        class="ri-subtract-line ri-2x"
                        onClick={() => handleDel(pro.id)}
                      ></i>
                    </span>
                  </CardText>
                  {/* <CardText>
                <small className="text-muted"></small>
              </CardText> */}
                </CardBody>
              </Col>
              <Col xs="3"></Col>
            </Row>
          </Card>
        </div>
      );
    });
  }

  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  return (
    <div>
      <NavComponent />
      {curUser && newUser && cartProdData && totalPay ? (
        <div>
          {card}
          <div>
            <Button color="info" onClick={toggle}>
              Check out
            </Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
              <ModalHeader toggle={toggle} close={closeBtn}>
                Total Pay
              </ModalHeader>
              <ModalBody>{totalPay}</ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={handleCheckout}>
                  Confirm
                </Button>{" "}
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      ) : (
        <div
          style={{
            fontFamily: "cursive",
            fontSize: "1rem",
            marginLeft: "150px",
            marginTop: "50px",
          }}
        >
          Empty cart, please add some products~
        </div>
      )}
    </div>
  );
};

export default ShopCartComponent;
