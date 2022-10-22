import React from "react";
import ProjectForm from "../components/ProjectForm";

// Import bootstrap components
import { Breadcrumb } from "react-bootstrap";

// Import Link component for all internal application hyperlinks
import { Link } from "react-router-dom";

const ProjectCreate = () => {
  return (
    <main>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/myprojects" }}>
          My projects
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Add project</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Add project</h2>
      <ProjectForm />
    </main>
  );
};

export default ProjectCreate;
