import React from "react";
import dog3 from "../styles/images/dog3.jpg";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "../styles/css/categories.css";

const Dog = () => {
  return (
    <div className="cardSet">
      <Card className="cSet">
        <CardMedia
          sx={{ height: 300 }}
          image={dog3}
          title="green iguana"
          className="imgSet"
        />
        <CardContent className="linkFont">
          <Link to="/products" state={{ category: "dog" }}>
            Dogs
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dog;
