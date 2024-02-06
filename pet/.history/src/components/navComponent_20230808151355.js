import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../manipulate/action";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavComponent = () => {
  const curUser = useSelector((state) => state.curUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // console.log(curUser);

  return (
    <div style={{ marginLeft: "40px", marginTop: "20px", marginRight: "40px" }}>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ textDecoration: "none" }}>
              Home
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link
              to="/products"
              state={{ category: "all" }}
              style={{ textDecoration: "none" }}
            >
              Products
            </Link>
            {curUser ? (
              <Link to="/shopcart" style={{ textDecoration: "none" }}>
                Shop Cart
              </Link>
            ) : (
              <a />
            )}

            {curUser ? (
              <Link to="/collections" style={{ textDecoration: "none" }}>
                <Button color="secondary">Collections</Button>
              </Link>
            ) : (
              <a />
            )}
            {/* {curUser ? (
        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <Button color="secondary">Check Out </Button>
        </Link>
      ) : (
        <a />
      )} */}
            {curUser ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              // <Button color="secondary" onClick={handleLogout}>
              //   Logout
              // </Button>
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            )}
            {/* {curUser ? (
        <a />
      ) : (
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button color="secondary">Register</Button>
        </Link>
      )} */}
            <Nav.Link href="#pricing">Pricing</Nav.Link>

            <Nav.Link>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                Contact
              </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavComponent;
