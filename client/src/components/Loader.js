import React from "react";

const Loader = () => {
  return (
    <div className="loading-container">
      <img
        src="/assets/loading.gif"
        alt="Loading"
        style={{
          height: "10vh",
          margin: "auto",
          marginTop: "35vh",
          display: "block",
        }}
      />
    </div>
  );
};

export default Loader;
