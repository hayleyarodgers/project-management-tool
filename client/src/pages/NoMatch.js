import React from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  // Retrieve the current `location` object data from React Router
  let location = useLocation();

  return (
    <div>
      <h2>
        No match for <code>{location.pathname}.</code>
      </h2>
    </div>
  );
};

export default NotFound;
