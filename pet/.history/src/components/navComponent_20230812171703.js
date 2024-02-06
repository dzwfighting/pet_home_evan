import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../manipulate/action";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
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
      {[false].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-body-tertiary mb-3 navDeco "
        >
          <Container fluid className="containerSet">
            <Navbar.Brand className="navDecoColor">
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                Welcome To Pet Home
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Pet Home
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link
                    to="/"
                    style={{ textDecoration: "none" }}
                    className="link"
                  >
                    Home
                  </Link>
                  <Link
                    to="/products"
                    state={{ category: "all" }}
                    style={{ textDecoration: "none" }}
                    className="link"
                  >
                    Products
                  </Link>
                  {curUser ? (
                    <Link
                      onClick={handleLogout}
                      style={{ textDecoration: "none" }}
                      className="link"
                    >
                      Logout
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      style={{ textDecoration: "none" }}
                      className="link"
                    >
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
                  <Link
                    to="/contact"
                    style={{ textDecoration: "none" }}
                    className="link"
                  >
                    Contact
                  </Link>
                  {/* <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
};

export default NavComponent;
