import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import "../styles/Nav.css";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

import Auth from "../utils/auth";

const AppNavbar = () => {
  // Set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar className="nav mb-4" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand className="brandName" as={Link} to="/">
            <h1 className="un">Pro</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              {/* If user is logged in, show projects, team and logout */}
              {/* If user is not logged in, show log in or sign up */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link className="un px-4" as={Link} to="/myteam">
                    My team
                  </Nav.Link>
                  <Nav.Link className="un px-4" as={Link} to="/myprojects">
                    My projects
                  </Nav.Link>
                  <Nav.Link className="un px-4" onClick={Auth.logout}>
                    Log out
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>
                  Log in or Sign up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
              <Nav variant="pills">
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
    </>
  );
};

export default AppNavbar;
