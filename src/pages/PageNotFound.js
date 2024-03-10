import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:'column'
      }}
    >
      <h2 className="h2">Page Not Found</h2>
      <p>
        Go back to{" "}
        <Link to={"/"} style={{textDecoration:'underline', color:'darkcyan'}}>
          Home Page
        </Link>
      </p>
    </div>
  );
};

export default PageNotFound;
