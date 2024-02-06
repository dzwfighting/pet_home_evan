import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
          {/* <Navbar.Brand>
            <Link to="/" style={{ textDecoration: "none" }}>
              Home
            </Link>
          </Navbar.Brand> */}
          <Link
            to="/products"
            state={{ category: "all" }}
            style={{ textDecoration: "none" }}
          >
            Products
          </Link>
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
          {curUser ? (
            <Link to="/shopcart" style={{ textDecoration: "none" }}>
              Shop Cart
            </Link>
          ) : null}
          {curUser ? (
            <Link to="/collections" style={{ textDecoration: "none" }}>
              Collections
            </Link>
          ) : null}
          <Link to="/contact" style={{ textDecoration: "none" }}>
            Contact
          </Link>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavComponent;
