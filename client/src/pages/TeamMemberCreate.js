import React from "react";
import TeamMemberForm from "../components/TeamMemberForm";

// Import bootstrap components
import { Breadcrumb } from "react-bootstrap";

// Import Link component for all internal application hyperlinks
import { Link } from "react-router-dom";

const TeamMemberCreate = () => {
  return (
    <main>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/myteam" }}>
          My team
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Add team member</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Add team member</h2>
      <TeamMemberForm />
    </main>
  );
};

export default TeamMemberCreate;
