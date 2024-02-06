import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import products from "../fake-data/products";

import "../styles/css/allproducts.css";
import { Link, useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import NavComponent from "./navComponent";
const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    height: "auto",
    marginLeft: "auto",
    marginRight: "10px",
    marginBottom: "10px",
    borderRadius: 5,
    border: "2px solid #1e8678",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
  },
  titleHead: {
    borderBottom: "1px solid #1e8678",
    fontWeight: "bold",
  },
  grid: {
    flexGrow: 1,
    flexDirection: "row",
  },
  media: {
    height: "100%",
    width: "100%",
  },
  button: {
    color: "#1e8678",
    fontWeight: "bold",
    fontSize: 12,
  },
  gridContainer: {
    justifyContent: "center",
  },
});

const AllProductsComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category;
  // const product = products.find((product) => product.id === id);
  console.log(location.state);
  console.log(category);
  // console.log(products);
  let card = null;
  const classes = useStyles();

  const currentProducts =
    category === "all" || location.state === null
      ? products
      : products.filter((product) => product.category === category);

  console.log(currentProducts);

  // const handleAddToCart = () => {};

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  const buildCard = (product) => {
    return (
      <div className="eachprocard">
        <CardHeader className={classes.titleHead} title={product.title} />
        <CardMedia
          className={classes.media}
          component="img"
          image={product.image}
          title="show image"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="span">
            <dl>
              <Button
                style={{
                  fontSize: "1.5rem",
                  color: "purple",
                  marginRight: "150px",
                }}
              >
                ${product.price}
              </Button>
              <Button color="secondary" onClick={() => handleClick(product.id)}>
                Details
              </Button>
              {/* <Button color="secondary" onClick={handleAddToCart}>
                  Add to Cart
                </Button> */}
            </dl>
          </Typography>
        </CardContent>
      </div>
    );
  };

  if (currentProducts) {
    card = (
      <Grid container className={classes.gridContainer}>
        {currentProducts &&
          currentProducts.map((product) => {
            return buildCard(product);
          })}
      </Grid>
    );
  }

  return <div>{card}</div>;
};

export default AllProductsComponent;
