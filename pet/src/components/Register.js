import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../manipulate/action";

import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  checkExitByEmail,
  validateEmail,
  validatePassword,
} from "../manipulate/checkValid";
import users from "../fake-data/users";
import NavComponent from "./navComponent";

const Register = (args) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const collections = [],
    cart = [],
    uploads = [];
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let errorMessage = "";

  const toggle = () => {
    setRegisterSuccess(!registerSuccess);
    navigate("/login");
  };

  const handleRegister = () => {
    // console.log(email, password);
    if (!validateEmail(email)) {
      // console.log(!validateEmail(email), !validatePassword(password));
      errorMessage = "Invalid email format, please try again";
      return navigate(`/error/${errorMessage}`);
    }
    if (!validatePassword(password)) {
      errorMessage =
        "Invalid password, the length of password must greate or equal than 4";
      return navigate(`/error/${errorMessage}`);
    }
    if (checkExitByEmail(email)) {
      console.log(checkExitByEmail(email));
      errorMessage = "This email already registed, please try another one";
      return navigate(`/error/${errorMessage}`);
    } else {
      let newUser = { email, password, collections, cart, uploads };
      dispatch(register(newUser));
      console.log(users);
      setRegisterSuccess(true);
    }
  };

  return (
    <div>
      <NavComponent />
      <div
        style={{ marginLeft: "40px", marginRight: "100px", marginTop: "60px" }}
      >
        <Form>
          <FormGroup>
            <Label
              for="exampleEmail"
              style={{ fontSize: "2rem", fontFamily: "cursive" }}
            >
              Email
            </Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="input your email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              style={{ height: "45px", marginBottom: "60px" }}
            />
          </FormGroup>
          <FormGroup>
            <Label
              for="examplePassword"
              style={{ fontSize: "2rem", fontFamily: "cursive" }}
            >
              Password
            </Label>
            <Input
              id="examplePassword"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password length must greater or equal than 4"
              type="password"
              style={{ height: "45px", marginBottom: "50px" }}
            />
          </FormGroup>
          <Button onClick={handleRegister}>Register</Button>
        </Form>
      </div>
      {registerSuccess && (
        <Modal isOpen={registerSuccess} toggle={toggle} {...args}>
          <ModalHeader toggle={toggle} style={{ fontFamily: "cursive" }}>
            Register success, start login
          </ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Ok
            </Button>{" "}
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

export default Register;
