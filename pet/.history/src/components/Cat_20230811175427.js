import React from "react";

import cat1 from "../styles/images/cat1.jpg";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "../styles/css/categories.css";

const Cat = () => {
  return (
    <Card sx={{ maxWidth: 1000 }} className="cardSet">
      <CardMedia sx={{ height: 200 }} image={cat1} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Link to="/products" state={{ category: "cat" }}>
            Cats
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Cat;
