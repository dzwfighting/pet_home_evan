import React from "react";
import dog3 from "../styles/images/dog3.jpg";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Dog = () => {
  return (
    <Card sx={{ maxWidth: 700 }}>
      <CardMedia sx={{ height: 200 }} image={dog3} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Link to="/products" state={{ category: "dog" }}>
            Dogs
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Dog;
