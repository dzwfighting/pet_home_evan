import React, { useState } from "react";
import NavComponent from "../components/navComponent";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { checkExitByEmail, checkLogin } from "../manipulate/checkValid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../manipulate/action";
import users from "../fake-data/users";

const Login = (args) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successLogin, setSuccessLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let errorMessage = "";
  const handleLogin = () => {
    if (checkLogin(email, password) == undefined) {
      console.log("in");
      errorMessage =
        "this email is not exit or the email input wrong, please try again";
      navigate(`/error/${errorMessage}`);
    } else {
      let curUser = { email, password };
      dispatch(login(curUser));
      setSuccessLogin(true);
      navigate("/");
    }
  };
  const toggle = () => {
    setSuccessLogin(!successLogin);
    navigate("/");
  };
  return (
    <div>
      <NavComponent />
      {successLogin && (
        <Modal isOpen={successLogin} toggle={toggle} {...args}>
          <ModalHeader toggle={toggle} style={{ fontFamily: "cursive" }}>
            Login success, enjoy~
          </ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Ok
            </Button>{" "}
          </ModalFooter>
        </Modal>
      )}
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
              placeholder="input your email"
              type="password"
              style={{ height: "45px", marginBottom: "50px" }}
            />
          </FormGroup>
          <Button onClick={handleLogin}>Login</Button>
        </Form>
        <div style={{ marginTop: "20px" }}>
          <div>not register? click hear to sign up~</div>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button color="secondary">Register</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
