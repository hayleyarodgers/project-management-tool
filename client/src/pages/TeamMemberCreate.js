import React from "react";

// Import bootstrap components
import { Breadcrumb } from "react-bootstrap";

// Import Link component for all internal application hyperlinks
import { Link } from "react-router-dom";

// Import component
import TeamMemberForm from "../components/TeamMemberForm";

const TeamMemberCreate = () => {
  return (
    <main>
      {/* Breadcrumb navigation */}
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/myteam" }}>
          My team
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Add team member</Breadcrumb.Item>
      </Breadcrumb>
      {/* Page title */}
      <h2>Add team member</h2>
      {/* Form for creating team members */}
      <TeamMemberForm />
    </main>
  );
};

export default TeamMemberCreate;
