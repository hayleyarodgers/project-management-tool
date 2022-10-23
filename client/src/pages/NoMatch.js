import React from "react";

// Import `useLocation()` to retrieve the current `location` object data from React Router
import { useLocation } from "react-router-dom";

// Import Link component for all internal application hyperlinks
import { Link } from "react-router-dom";

// Import error image
import error from "../assets/error.jpg";

const NotFound = () => {
  let location = useLocation();

  return (
    <main className="d-flex justify-content-between align-items-top">
      <div>
        <h2>Oops!</h2>
        <p>
          There doesn't appear to be a page for <b>{location.pathname}</b>.
        </p>
        <Link className="btn" variant="success" to={`/`}>
          Go back to home page
        </Link>
      </div>
      <img src={error} alt="Error" style={{ width: "50%", margin: "auto" }} />
    </main>
  );
};

export default NotFound;
