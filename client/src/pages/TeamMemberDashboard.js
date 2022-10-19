import React, { useState, useEffect } from "react";

// Import bootstrap components
import { Row, Col, Card } from "react-bootstrap";

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
      <h1>My team</h1>
      <Link className="btn" to={`/myteam/addteammember`}>
        Add team member
      </Link>
      <h2>
        {userData.teamCount
          ? ` `
          : "Please add your first team member to get started."}
      </h2>
      <Row xs={1} md={2} className="g-4">
        {userData.teamMembers.map((teamMember) => {
          return (
            <Col key={teamMember._id}>
              <Card border="dark">
                {teamMember.image ? (
                  <Card.Img
                    src={teamMember.image}
                    alt={`The cover for ${teamMember.username}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{teamMember.username}</Card.Title>
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
