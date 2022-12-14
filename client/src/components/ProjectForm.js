import React, { useState } from "react";

// Import bootstrap components
import { Form, Button, Alert } from "react-bootstrap";

// Import `useHistory()` to access and edit browser history
import { useHistory } from "react-router-dom";

// Import API call, authentication token and saving userId to local storage functions
import { createProject } from "../utils/API";
import Auth from "../utils/auth";
import { getSavedUserId } from "../utils/localStorage";

const ProjectForm = () => {
  // Use `useHistory()` to redirect to feature creation after form submit
  const history = useHistory();

  // Set initial form state
  const [projectFormData, setProjectFormData] = useState({
    projectName: "",
    projectDescription: "",
    projectUserStory: "",
    projectManager: getSavedUserId(),
  });
  // Set state for form validation
  const [validated] = useState(false);
  // Set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // When the input of any form field changes, set form data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProjectFormData({ ...projectFormData, [name]: value });
  };

  // Create new project
  const handleFormSubmit = async (event) => {
    // Stop page refresh
    event.preventDefault();

    // Check token before proceeding
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // Check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Since createProject is asynchronous, wrap in a `try...catch` to catch any network errors from throwing due to a failed request
    try {
      const response = await createProject(projectFormData, token);

      if (!response.ok) {
        throw new Error("Something went wrong when creating project.");
      }

      const project = await response.json();
      const projectId = project._id;

      // Reset form data
      setProjectFormData({
        projectName: "",
        projectDescription: "",
        projectUserStory: "",
        projectManager: getSavedUserId(),
      });

      // Go to feature creation form
      history.push(`/myprojects/${projectId}/features`);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      {/* Show alert if server response is bad */}
      <Alert
        dismissible
        onClose={() => setShowAlert(false)}
        show={showAlert}
        variant="danger">
        Something went wrong.
      </Alert>

      {/* Project name input */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="projectName">Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Project X"
          name="projectName"
          onChange={handleInputChange}
          value={projectFormData.projectName}
          required
        />
        <Form.Control.Feedback type="invalid" muted>
          Please add a name for your project.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Project description input */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="projectDescription">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={1}
          placeholder="Project X's description"
          name="projectDescription"
          onChange={handleInputChange}
          value={projectFormData.projectDescription}
          required
        />
        <Form.Control.Feedback type="invalid" muted>
          Please add a description for your project.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Project user story input */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="projectUserStory">User story</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder={`AS A...
I WANT...
SO THAT...`}
          name="projectUserStory"
          onChange={handleInputChange}
          value={projectFormData.projectUserStory}
          required
        />
        <Form.Control.Feedback type="invalid" muted>
          Please add a user story for your project.
        </Form.Control.Feedback>
      </Form.Group>

      {/* On form submit, create project */}
      <Button type="submit" variant="success">
        Create
      </Button>
    </Form>
  );
};

export default ProjectForm;
