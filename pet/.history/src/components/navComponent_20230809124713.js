import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../manipulate/action";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/css/nav.css";

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
    <div className="wholeLink">
      <Navbar>
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
        </Navbar.Brand>
        <Link
          to="/products"
          state={{ category: "all" }}
          style={{ textDecoration: "none" }}
          className="link"
        >
          Products
        </Link>
        {curUser ? (
          <Nav.Link
            onClick={handleLogout}
            style={{ textDecoration: "none" }}
            className="link"
          >
            Logout
          </Nav.Link>
        ) : (
          // <Button color="secondary" onClick={handleLogout}>
          //   Logout
          // </Button>
          <Link to="/login" style={{ textDecoration: "none" }} className="link">
            Login
          </Link>
        )}
        {curUser ? (
          <Link
            to="/shopcart"
            style={{ textDecoration: "none" }}
            className="link"
          >
            Shop Cart
          </Link>
        ) : null}
        {curUser ? (
          <Link
            to="/collections"
            style={{ textDecoration: "none" }}
            className="link"
          >
            Collections
          </Link>
        ) : null}
        <Link to="/contact" style={{ textDecoration: "none" }} className="link">
          Contact
        </Link>
      </Navbar>
    </div>
  );
};

export default NavComponent;
