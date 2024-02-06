import React from "react";
import Dog from "./Dog";
import Cat from "./Cat";
import Introduce from "./Introduce";

const homeComponent = () => {
  return (
    <div
      style={{
        marginLeft: "20px",
        marginBottom: "40px",
        marginTop: "40px",
        marginRight: "20px",
      }}
    >
      <Introduce />
      <Cat />
      <Dog />
    </div>
  );
};

export default homeComponent;
