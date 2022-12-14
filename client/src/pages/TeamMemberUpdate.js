import React, { useState, useEffect } from "react";

// Import bootstrap components
import { Form, Button, Alert, Breadcrumb } from "react-bootstrap";

// Import Link component for all internal application hyperlinks
// Import `useParams()` to retrieve value of the route parameter `:projectId`
// Import `useHistory()` to access and edit browser history
import { useParams, useHistory, Link } from "react-router-dom";

// Import API calls and authentication token functions
import { getTeamMember, updateTeamMember } from "../utils/API";
import Auth from "../utils/auth";

const TeamMemberUpdate = () => {
  // Use `useHistory()` to redirect to team dashboard after form submit
  const history = useHistory();
  // Use `useParams()` to retrieve value of the route parameter `:teamMemberId`
  const { teamMemberId } = useParams();
  // Set state for team member data
  const [teamMemberData, setTeamMemberData] = useState({});
  // Set state for form validation
  const [validated] = useState(false);
  // Set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // Get team member data to populate form for easier updating
  useEffect(() => {
    const getTeamMemberData = async () => {
      // Since getTeamMember is asynchronous, wrap in a `try...catch` to catch any network errors from throwing due to a failed request
      try {
        // Check token before proceeding
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getTeamMember(teamMemberId, token);

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }

        const teamMember = await response.json();
        setTeamMemberData(teamMember);
      } catch (err) {
        console.error(err);
      }
    };

    getTeamMemberData();
  }, [teamMemberId]);

  // When the input of any form field changes, set form data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTeamMemberData({ ...teamMemberData, [name]: value });
  };

  // Update team member when form is submitted
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

    // Since updateTeamMember is asynchronous, wrap in a `try...catch` to catch any network errors from throwing due to a failed request
    try {
      const response = await updateTeamMember(
        teamMemberId,
        teamMemberData,
        token
      );

      if (!response.ok) {
        throw new Error("Something went wrong when updating team member.");
      }
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // Go back to team dashboard
    history.push("/myteam");
  };

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
        <Breadcrumb.Item active>Update team member</Breadcrumb.Item>
      </Breadcrumb>
      {/* Page title */}
      <h2>Update {teamMemberData.username}'s profile</h2>
      {/* Form for updating team member */}
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
            value={teamMemberData.username}
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
            value={teamMemberData.role}
            required>
            <option>Choose an option</option>
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
            min="0"
            max="3"
            onChange={handleInputChange}
            value={teamMemberData.efficiency}
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
            value={teamMemberData.hoursPerWeek}
            required
          />
          <Form.Control.Feedback type="invalid" muted>
            Please add an hours per week estimate.
          </Form.Control.Feedback>
        </Form.Group>

        {/* On form submit, update team member */}
        <Button type="submit" variant="success">
          Save
        </Button>
      </Form>
    </main>
  );
};

export default TeamMemberUpdate;
