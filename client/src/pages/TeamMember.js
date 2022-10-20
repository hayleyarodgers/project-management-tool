import React, { useState, useEffect } from "react";

// Import bootstrap components
// import { Row, Col, Card } from "react-bootstrap";

// Import Link component for all internal application hyperlinks
// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// Import API calls
import { getTeamMember } from "../utils/API";
import Auth from "../utils/auth";

const TeamMember = () => {
  const [teamMember, setTeamMember] = useState({});

  // Use `useParams()` to retrieve value of the route parameter `:teamMemberId`
  const { teamMemberId } = useParams();

  // Get team member data
  useEffect(() => {
    const getTeamMemberData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getTeamMember(teamMemberId, token);

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }

        const teamMember = await response.json();
        setTeamMember(teamMember);
      } catch (err) {
        console.error(err);
      }
    };

    getTeamMemberData();
  }, [teamMemberId]);

  return (
    <main>
      <h1>{teamMember.username} page</h1>
    </main>
  );
};

export default TeamMember;
