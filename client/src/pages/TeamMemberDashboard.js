import React, { useState, useEffect } from "react";

// Import bootstrap components
import { Row, Col, Card, Breadcrumb, Button } from "react-bootstrap";

// Import placeholder profile image
import profilePicture from "../assets/profile.png";

// Import Link component for all internal application hyperlinks
import { Link } from "react-router-dom";

// Import API calls and authentication token functions
import { getUser, deleteTeamMember } from "../utils/API";
import Auth from "../utils/auth";

const TeamMemberDashboard = () => {
  // Set initial state
  const [userData, setUserData] = useState({});

  // Use to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  // Get user data, including their team members
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

  // Handle delete team member
  const handleDeleteTeamMember = async (teamMemberId) => {
    // Check token before proceeding

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // Since deleteTeamMember and getUser are asynchronous, wrap in a `try...catch` to catch any network errors from throwing due to a failed request
    try {
      const response = await deleteTeamMember(teamMemberId, token);

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      const refetch = await getUser(token);

      if (!refetch.ok) {
        throw new Error("Something went wrong.");
      }

      const user = await refetch.json();
      setUserData(user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      {/* Breadcrumb navigation */}
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>My team</Breadcrumb.Item>
      </Breadcrumb>
      {/* Page title */}
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
      {/* For each team member, render a card */}
      <Row xs={1} md={3} xl={5} className="g-4">
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
                  <Card.Text>
                    <b>{teamMember.efficiency}</b> efficiency,{" "}
                    <b>{teamMember.hoursPerWeek}</b> hours/week
                  </Card.Text>
                  <div className="d-flex justify-content-around">
                    <Link
                      className="btn"
                      variant="success"
                      to={`/myteam/${teamMember._id}`}>
                      Edit
                    </Link>
                    <Button
                      className="btn"
                      variant="success"
                      onClick={() => handleDeleteTeamMember(teamMember._id)}>
                      Delete
                    </Button>
                  </div>
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
