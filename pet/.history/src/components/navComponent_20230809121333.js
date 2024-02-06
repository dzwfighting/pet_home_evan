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
          <Navbar.Brand>
            <Link to="/" style={{ textDecoration: "none" }}>
              Home
            </Link>
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
              <p />
            )}
            {curUser ? (
              <Link to="/collections" style={{ textDecoration: "none" }}>
                Collections
              </Link>
            ) : (
              <p />
            )}
          </Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link>
              <Link
                to="/products"
                state={{ category: "all" }}
                style={{ textDecoration: "none" }}
              >
                Products
              </Link>
            </Nav.Link> */}
            {/* <Nav.Link>
              {curUser ? (
                <Link to="/shopcart" style={{ textDecoration: "none" }}>
                  Shop Cart
                </Link>
              ) : (
                <p />
              )}
            </Nav.Link> */}
            {/* <Nav.Link>
              {curUser ? (
                <Link to="/collections" style={{ textDecoration: "none" }}>
                  Collections
                </Link>
              ) : (
                <p />
              )}
            </Nav.Link> */}
            <Nav.Link>
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
            </Nav.Link>
            <Nav.Link>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                Contact
              </Link>
            </Nav.Link>

            {/* {curUser ? (
        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <Button color="secondary">Check Out </Button>
        </Link>
      ) : (
        <a />
      )} */}

            {/* {curUser ? (
        <a />
      ) : (
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button color="secondary">Register</Button>
        </Link>
      )} */}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavComponent;
