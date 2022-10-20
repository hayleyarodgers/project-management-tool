import React, { useState, useEffect } from "react";

// Import bootstrap components
import { Row, Col, Card } from "react-bootstrap";

// Import Link component for all internal application hyperlinks
import { Link } from "react-router-dom";

// Import API calls
import { getUser } from "../utils/API";
import Auth from "../utils/auth";

const ProjectDashboard = () => {
  const [userData, setUserData] = useState({});

  // Use to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  // Get user data, including their projects
  useEffect(() => {
    const getUserData = async () => {
      try {
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
      <h1>My projects</h1>
      <Link className="btn" to={`/myprojects/addproject`}>
        Add project
      </Link>
      <h2>
        {userData.projects.length
          ? `You have ${userData.projects.length} ${
              userData.projects.length === 1 ? "project" : "projects"
            }:`
          : "Please add your first project to get started!"}
      </h2>
      <Row xs={1} md={2} className="g-4">
        {userData.projects.map((project) => {
          return (
            <Col key={project._id}>
              <Card border="dark">
                {project.image ? (
                  <Card.Img
                    src={project.image}
                    alt={`The cover for ${project.name}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{project.name}</Card.Title>
                  <Card.Text>Placeholder</Card.Text>
                  {/* <Button className='btn' onClick={() => handleUpdateTeamMember(teamMember._id)}>
                  Update
                  </Button>
                  <Button className='btn' onClick={() => handleDeleteTeamMember(teamMember._id)}>
                    Delete
                  </Button> */}
                  <Link className="btn" to={`/myprojects/${project._id}`}>
                    See more
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </main>
  );
};

export default ProjectDashboard;
