import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../manipulate/action";

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
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button color="secondary">Home</Button>
      </Link>

      <Link
        to="/products"
        state={{ category: "all" }}
        style={{ textDecoration: "none" }}
      >
        <Button color="secondary">Products</Button>
      </Link>
      {curUser ? (
        <Link to="/shopcart" style={{ textDecoration: "none" }}>
          <Button color="secondary">Shop Cart</Button>
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
        <Button color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button color="secondary">Login</Button>
        </Link>
      )}
      {curUser ? (
        <a />
      ) : (
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button color="secondary">Register</Button>
        </Link>
      )}
      <Link to="/contact" style={{ textDecoration: "none" }}>
        <Button color="secondary">Contact</Button>
      </Link>
    </div>
  );
};

export default NavComponent;
