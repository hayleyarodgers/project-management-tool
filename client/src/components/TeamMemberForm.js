import React, { useState } from "react";

// Import bootstrap components
import { Form, Button, Alert } from "react-bootstrap";

// Import `useHistory()` to access and edit browser history
import { useHistory } from "react-router-dom";

// Import API call, authentication token and getting saved userId to local storage functions
import { createTeamMember } from "../utils/API";
import Auth from "../utils/auth";
import { getSavedUserId } from "../utils/localStorage";

const TeamMemberForm = () => {
  // Use `useHistory()` to access and edit browser history
  const history = useHistory();

  // Set initial form state
  const [teamMemberFormData, setTeamMemberFormData] = useState({
    username: "",
    role: "",
    efficiency: 1,
    hoursPerWeek: 40,
    manager: getSavedUserId(),
  });
  // Set state for form validation
  const [validated] = useState(false);
  // Set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // When the input of any form field changes, set form data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTeamMemberFormData({ ...teamMemberFormData, [name]: value });
  };

  // Create new team member
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

    // Reset form data
    setTeamMemberFormData({
      username: "",
      role: "",
      efficiency: 1,
      hoursPerWeek: 40,
    });

    // Go to team dashboard
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

      {/* Team member username input */}
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

      {/* Team member role input */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="role">Role</Form.Label>
        <Form.Select
          name="role"
          onChange={handleInputChange}
          value={teamMemberFormData.role}
          required>
          <option defaultValue>Choose an option</option>
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

      {/* Team member efficiency input */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="efficiency">Efficiency</Form.Label>
        <Form.Control
          type="number"
          placeholder="New team member's efficiency"
          name="efficiency"
          min="0.1"
          max="3"
          onChange={handleInputChange}
          value={teamMemberFormData.efficiency}
          required
        />
        <Form.Text muted>
          Proportional to 1, such that 0 {"<"} 1 = faster than average, 1 =
          average, {">"} 1 = slower than average.
        </Form.Text>
        <Form.Control.Feedback type="invalid" muted>
          Please add an efficiency estimate.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Team member hours input */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="hoursPerWeek">Hours/week</Form.Label>
        <Form.Control
          type="number"
          placeholder="Number of hours/week"
          name="hoursPerWeek"
          min="0"
          max="40"
          onChange={handleInputChange}
          value={teamMemberFormData.hoursPerWeek}
          required
        />
        <Form.Text muted>Must be written in hours.</Form.Text>
        <Form.Control.Feedback type="invalid" muted>
          Please add an hours per week estimate.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Future feature = allowing photo upload */}
      {/* <Form.Group className="mb-3" controlId="formImage">
        <Form.Label htmlFor="password">Image</Form.Label>
        <Form.Control type="file" />
      </Form.Group> */}

      {/* On form submit, create team member */}
      <Button type="submit" variant="success">
        Create
      </Button>
    </Form>
  );
};

export default TeamMemberForm;
