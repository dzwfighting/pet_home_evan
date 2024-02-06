import React from "react";
import Nav from "./navComponent";
import AllProductsComponent from "./AllProductsComponent";
import Cat from "./Cat";
import Dog from "./Dog";

const Products = () => {
  return (
    <div>
      <Nav />
      <div>
        {" "}
        <Cat />
      </div>

      <div>
        <Dog />
      </div>
      <AllProductsComponent />
    </div>
  );
};

export default Products;
