import React from "react";
import Introduce from "./Introduce";
import AllProductsComponent from "./AllProductsComponent";

const homeComponent = () => {
  return (
    <div
    // style={{
    //   marginLeft: "20px",
    //   marginBottom: "40px",
    //   marginTop: "40px",
    //   marginRight: "20px",
    // }}
    >
      <Introduce />
      <AllProductsComponent />
    </div>
  );
};

export default homeComponent;
