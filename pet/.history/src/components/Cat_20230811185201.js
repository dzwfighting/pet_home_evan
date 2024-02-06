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
    <div className="cardSet">
      <Card>
        <CardMedia sx={{ height: 200 }} image={cat1} title="green iguana" />
        <CardContent>
          <Link to="/products" state={{ category: "cat" }}>
            Cats
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cat;
