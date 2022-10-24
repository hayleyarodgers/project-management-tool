import React, { useState } from "react";

// Import bootstrap components
import { Nav, Modal, Tab, Button } from "react-bootstrap";

// Import Link component for all internal application hyperlinks
import { Link } from "react-router-dom";

// Import components
import SignUpForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

// Import custom styles
import "../styles/Home.css";

// Import homepage image
import home from "../assets/home.png";

// Import authentication token function
import Auth from "../utils/auth";

const Home = () => {
  // Set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="home d-flex flex-column align-items-center">
      <h1>
        Welcome to <span className="brand">Pro</span>.
      </h1>
      <p>
        The data-driven <b>project management tool</b> for software development
        teams.
      </p>
      {Auth.loggedIn() ? (
        <div className="d-flex justify-content-between">
          <Link className="btn mx-3" to={`/myteam`}>
            Go to your team
          </Link>
          <Link className="btn mx-3" to={`/myprojects`}>
            Go to your projects
          </Link>
        </div>
      ) : (
        <Button
          className="btn"
          variant="success"
          onClick={() => setShowModal(true)}>
          Get started
        </Button>
      )}

      <img src={home} alt="Home" style={{ width: "65%", margin: "auto" }} />
      {/* Set modal data up */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal">
        {/* Tab container to show either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav>
                <Nav.Item>
                  <Nav.Link eventKey="login">Log in</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </main>
  );
};

export default Home;
