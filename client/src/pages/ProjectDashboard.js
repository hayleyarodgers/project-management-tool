import React, { useState, useEffect } from "react";

// Import bootstrap components
import { Row, Col, Card, Breadcrumb } from "react-bootstrap";

// Import Link component for all internal application hyperlinks
import { Link } from "react-router-dom";

// Import API call and authentication token functions
import { getUser } from "../utils/API";
import Auth from "../utils/auth";

// Import custom styles
import "../styles/ProjectDashboard.css";

const ProjectDashboard = () => {
  // Set initial state
  const [userData, setUserData] = useState({});

  // Use to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  // Get user data, including their projects
  useEffect(() => {
    const getUserData = async () => {
      // Since getUser is asynchronous, wrap in a `try...catch` to catch any network errors from throwing due to a failed request
      try {
        // Check token before proceeding
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getUser(token);

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // If data isn't here yet, say so
  if (!userDataLength) {
    return <h2>Loading...</h2>;
  }

  return (
    <main>
      {/* Breadcrumb navigation */}
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>My projects</Breadcrumb.Item>
      </Breadcrumb>
      {/* Page title */}
      <div className="d-flex align-items-center">
        <h2>My projects</h2>
        <Link className="btn-create" to={`/myprojects/addproject`}>
          +
        </Link>
      </div>
      <p>
        {userData.projects.length
          ? `You have ${userData.projects.length} ${
              userData.projects.length === 1 ? "project" : "projects"
            }:`
          : "Please add your first project to get started!"}
      </p>
      <Row xs={1} md={3} xl={5} className="g-4">
        {/* For each project, render a card */}
        {userData.projects.map((project) => {
          return (
            <Col key={project._id} className="container-fluid g-4">
              <Card className="card project border-0 h-100 d-flex text-center">
                <Link
                  to={`/myprojects/${project._id}`}
                  className="parent-hover">
                  <Card.Body>
                    <Card.Title>
                      <h3 className="un">{project.projectName}</h3>
                    </Card.Title>
                    <Card.Text class="text">
                      {project.projectDescription}
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    </main>
  );
};

export default ProjectDashboard;
