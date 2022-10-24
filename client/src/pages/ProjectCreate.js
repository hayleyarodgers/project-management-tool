import React from "react";

// Import bootstrap components
import { Breadcrumb } from "react-bootstrap";

// Import Link component for all internal application hyperlinks
import { Link } from "react-router-dom";

// Import components
import ProjectForm from "../components/ProjectForm";

const ProjectCreate = () => {
  return (
    <main>
      {/* Breadcrumb navigation */}
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/myprojects" }}>
          My projects
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Add project</Breadcrumb.Item>
      </Breadcrumb>
      {/* Page title */}
      <h2>Add project</h2>
      {/* Form for creating project */}
      <ProjectForm />
    </main>
  );
};

export default ProjectCreate;
