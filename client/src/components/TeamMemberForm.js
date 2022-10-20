import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Form, Button, Alert } from "react-bootstrap";

import { createTeamMember } from "../utils/API";
import Auth from "../utils/auth";
import { getSavedUserId } from "../utils/localStorage";

const TeamMemberForm = () => {
  // Set initial form state
  const [teamMemberFormData, setTeamMemberFormData] = useState({
    username: "",
    role: "",
    efficiency: "",
    hoursPerWeek: "",
    manager: getSavedUserId(),
  });

  const history = useHistory();

  // Set state for form validation
  const [validated] = useState(false);
  // Set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // Set form data when input of any form field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTeamMemberFormData({ ...teamMemberFormData, [name]: value });
  };

  // Create new team member
  const handleFormSubmit = async (event) => {
    // Stop page refresh
    event.preventDefault();

    // Check token before proceeding to create new team member
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

    // Since createTeamMember is asynchronous, wrap in a `try...catch` to catch any network errors from throwing due to a failed request
    try {
      const response = await createTeamMember(teamMemberFormData, token);
      console.log(teamMemberFormData);

      if (!response.ok) {
        throw new Error("Something went wrong when creating team member.");
      }
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setTeamMemberFormData({
      username: "",
      role: "",
      efficiency: "",
      hoursPerWeek: "",
    });

    history.push("/myteam");
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

      <Form.Group className="mb-3">
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="New team member's username"
          name="username"
          onChange={handleInputChange}
          value={teamMemberFormData.username}
          required
        />
        <Form.Control.Feedback type="invalid" muted>
          Please add a username.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="role">Role</Form.Label>
        <Form.Select
          name="role"
          onChange={handleInputChange}
          value={teamMemberFormData.role}
          required>
          <option>Senior back-end dev</option>
          <option>Senior front-end dev</option>
          <option>Senior full-stack dev</option>
          <option>Junior back-end dev</option>
          <option>Junior front-end dev</option>
          <option>Junior full-stack dev</option>
          <option>Intern</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid" muted>
          Please add role.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="efficiency">Efficiency</Form.Label>
        <Form.Control
          type="text"
          placeholder="New team member's efficiency"
          name="efficiency"
          onChange={handleInputChange}
          value={teamMemberFormData.efficiency}
          required
        />
        <Form.Control.Feedback type="invalid" muted>
          Please add an efficiency estimate.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="hoursPerWeek">Hours/week</Form.Label>
        <Form.Control
          type="text"
          placeholder="Number of hours/week"
          name="hoursPerWeek"
          onChange={handleInputChange}
          value={teamMemberFormData.hoursPerWeek}
          required
        />
        <Form.Control.Feedback type="invalid" muted>
          Please add an hours per week estimate.
        </Form.Control.Feedback>
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formImage">
        <Form.Label htmlFor="password">Image</Form.Label>
        <Form.Control type="file" />
      </Form.Group> */}

      <Button type="submit" variant="success">
        Create
      </Button>
    </Form>
  );
};

export default TeamMemberForm;
