import React, { useState, useEffect } from "react";

// Import bootstrap components
import { Row, Col, Card, Breadcrumb } from "react-bootstrap";
import profilePicture from "../assets/profile.png";

// Import Link component for all internal application hyperlinks
import { Link } from "react-router-dom";

// Import API calls
import { getUser } from "../utils/API";
import Auth from "../utils/auth";

const TeamMemberDashboard = () => {
  const [userData, setUserData] = useState({});

  // Use to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  // Get user data, including their team members
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
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>My team</Breadcrumb.Item>
      </Breadcrumb>
      <div className="d-flex align-items-center">
        <h2>My team</h2>
        <Link className="btn-create" to={`/myteam/addteammember`}>
          +
        </Link>
      </div>
      <p>
        {userData.teamMembers.length
          ? `You have ${userData.teamMembers.length} ${
              userData.teamMembers.length === 1 ? "team member" : "team members"
            }:`
          : "Please add your first team member to get started!"}
      </p>
      <Row xs={1} sm={3} md={4} lg={5} className="g-4">
        {userData.teamMembers.map((teamMember) => {
          return (
            <Col key={teamMember._id} className="container-fluid g-4">
              <Card className="card border-0 h-100 d-flex text-center">
                {teamMember.image ? (
                  <Card.Img
                    src={teamMember.image}
                    alt={`The cover for ${teamMember.username}`}
                    variant="top"
                  />
                ) : (
                  <Card.Img
                    src={profilePicture}
                    alt={`The cover for ${teamMember.username}`}
                    variant="top"
                  />
                )}
                <Card.Body>
                  <Card.Title>
                    <h3>{teamMember.username}</h3>
                  </Card.Title>
                  <Card.Text>{teamMember.role}</Card.Text>
                  <Card.Text>{teamMember.efficiency}</Card.Text>
                  {/* <Button className='btn' onClick={() => handleUpdateTeamMember(teamMember._id)}>
                  Update
                  </Button>
                  <Button className='btn' onClick={() => handleDeleteTeamMember(teamMember._id)}>
                    Delete
                  </Button> */}
                  <Link className="btn" to={`/myteam/${teamMember._id}`}>
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

export default TeamMemberDashboard;
