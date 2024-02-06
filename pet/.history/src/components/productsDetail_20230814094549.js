import React, { useEffect, useState } from "react";
import products from "../fake-data/products";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
} from "@material-ui/core";
import NavComponent from "./navComponent";
import { useDispatch, useSelector } from "react-redux";
import users, {
  addCart,
  addCollect,
  delCart,
  deleteCollect,
} from "../fake-data/users";
import "../styles/css/prodetail.css";

const useStyles = makeStyles({
  card: {
    // maxWidth: 500,
    // height: "auto",
    // marginTop: "40px",
    // marginLeft: "auto",
    // marginRight: "auto",
    // marginBottom: "50px",
    borderRadius: 5,
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
  },
  titleHead: {
    borderBottom: "1px solid",
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
});

const ProductsDetail = () => {
  const [addIn, setAddin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isCollect, setIsCollect] = useState(false);
  const [checkUser, setCheckUser] = useState({});
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  let curUser = useSelector((state) => state.curUser);

  useEffect(() => {
    console.log("refresh");
    if (curUser) setIsLogin(true);
    else setIsLogin(false);
    if (curUser) {
      setCheckUser(users.filter((user) => user.email === curUser.email)[0]);
      console.log(checkUser);
      // console.log(checkUser.collections);
      if (
        checkUser &&
        checkUser.collections &&
        checkUser.collections.filter((collectProId) => collectProId === id)
          .length > 0
      ) {
        console.log("is collect");
        setIsCollect(true);
      } else {
        console.log("is not collect");
        setIsCollect(false);
      }
      if (
        checkUser &&
        checkUser.cart &&
        checkUser.cart.filter((p) => p.proId === id)
      ) {
        setAddin(true);
      } else {
        setAddin(false);
      }
    }
    navigate(`/products/${id}`);
  }, [curUser, checkUser]);

  let curProduct = products.filter((product) => product.id === id);
  curProduct = curProduct[0];
  console.log(curProduct);

  const handleCollect = () => {
    setIsCollect(true);
    console.log(curUser.collections);
    let newUser = addCollect(curUser.email, id);
    setCheckUser(newUser);

    // console.log(users.filter((user) => user.email === curUser.email)[0]);
  };

  const handleUnCollect = () => {
    setIsCollect(false);
    console.log("del");
    let newUser = deleteCollect(curUser.email, id);
    setCheckUser(newUser);
  };

  const handleAddToCart = () => {
    setAddin(!addIn);
    if (addIn) {
      let newUser = addCart(curUser.email, id);
      setCheckUser(newUser);
    } else {
      let newUser = delCart(curUser.email, id);
      setCheckUser(newUser);
    }
    navigate(`/products/${id}`);
  };
  return (
    <div>
      <NavComponent />

      <div className="detailcard" variant="outlined">
        <img src={curProduct.image} alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Product Price
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginBottom: "30px" }}
          >
            ${curProduct.price}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Product Details
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {curProduct.desc}
          </Typography>
        </CardContent>
        <CardActions>
          {isLogin &&
            (isCollect ? (
              <Button
                size="small"
                onClick={() => handleUnCollect(curProduct.id)}
              >
                UnCollect
              </Button>
            ) : (
              <Button size="small" onClick={() => handleCollect(curProduct.id)}>
                Collect
              </Button>
            ))}
          {isLogin &&
            (addIn ? (
              <Button size="small" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            ) : (
              <Button size="small" onClick={handleAddToCart}>
                Delete From Cart
              </Button>
            ))}
        </CardActions>
      </div>
    </div>
  );
};

export default ProductsDetail;
