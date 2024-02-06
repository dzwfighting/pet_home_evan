import React from "react";
import Nav from "./navComponent";
import AllProductsComponent from "./AllProductsComponent";
import Cat from "./Cat";
import Dog from "./Dog";

const Products = () => {
  return (
    <div>
      <Nav />
      <Cat />
      <Dog />
      <AllProductsComponent />
    </div>
  );
};

export default Products;
