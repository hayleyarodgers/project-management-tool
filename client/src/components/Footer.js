import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="w-100 mt-auto text-muted p-4">
      <div className="container text-center mb-5">
        <h4>&copy; {new Date().getFullYear()} - Hayley Rodgers</h4>
        <p>
          Made using Mongoose, Express.js, React.js, Node.js and a RESTful API
          on Gadigal Land. To see the source code, click{" "}
          <a
            href="https://github.com/hayleyarodgers/project-management-tool"
            target="_blank"
            rel="noopener noreferrer">
            here
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
