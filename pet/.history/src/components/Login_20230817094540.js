import React, { useState } from "react";
import NavComponent from "../components/navComponent";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { checkExitByEmail, checkLogin } from "../manipulate/checkValid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../manipulate/action";
import "../App.css";
import "../styles/css/login.css";

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
          <ModalHeader toggle={toggle}>Login success, enjoy~</ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Ok
            </Button>{" "}
          </ModalFooter>
        </Modal>
      )}
      <div className="formSet">
        <Form>
          <FormGroup>
            <Label for="exampleEmail" className="lableSet">
              Email
            </Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="input your email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              style={{ height: "45px", marginBottom: "60px" }}
              className="inputSet"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword" className="lableSet">
              Password
            </Label>
            <Input
              id="examplePassword"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="input your email"
              type="password"
              style={{ height: "45px", marginBottom: "50px" }}
              className="inputSet"
            />
          </FormGroup>
          <Button onClick={handleLogin} color="info" className="loginbtnSet">
            <p>Login</p>
          </Button>
          <div style={{ marginTop: "20px" }} className="pSet">
            Not register? click hear to sign
            up~&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link
              to="/register"
              style={{ textDecoration: "none" }}
              className="btnSet"
            >
              <Button color="info" className="regSet">
                <p>Register</p>
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
