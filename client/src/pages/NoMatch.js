import React from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  let location = useLocation();

  return (
    <div>
      <h1>
        No match for <code>{location.pathname}.</code>
      </h1>
    </div>
  );
};

export default NotFound;
