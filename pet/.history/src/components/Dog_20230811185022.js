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
    <Card className="cardSet">
      <CardMedia sx={{ height: 200 }} image={dog3} title="green iguana" />
      <CardContent>
        <Link to="/products" state={{ category: "dog" }}>
          Dogs
        </Link>
      </CardContent>
    </Card>
  );
};

export default Dog;
