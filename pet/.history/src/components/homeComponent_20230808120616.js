import React from "react";
import Dog from "./Dog";
import Cat from "./Cat";

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
      <Cat />
      <Dog />
    </div>
  );
};

export default homeComponent;
