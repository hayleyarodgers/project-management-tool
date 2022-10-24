import React, { useState } from "react";

// Import bootstrap components
import { Form, Button, Alert } from "react-bootstrap";

// Import `useHistory()` to access and edit browser history
import { useHistory } from "react-router-dom";

// Import API call and authentication token functions
import { createFeature } from "../utils/API";
import Auth from "../utils/auth";

const FeatureForm = ({ projectId, teamMembers }) => {
  // Use `useHistory()` to access and edit browser history
  const history = useHistory();

  // Set initial form state
  const [featureFormData, setFeatureFormData] = useState({
    featureName: "",
    featureDescription: "",
    featureMustHave: "",
    featureAssignee: "",
  });
  // Set state for form validation
  const [validated] = useState(false);
  // Set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // When the input of any form field changes, set form data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFeatureFormData({ ...featureFormData, [name]: value });
  };

  // Create new feature
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

    // Since createFeature is asynchronous, wrap in a `try...catch` to catch any network errors from throwing due to a failed request
    try {
      const response = await createFeature(projectId, featureFormData, token);

      if (!response.ok) {
        throw new Error("Something went wrong when creating feature.");
      }
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // Reset form data
    setFeatureFormData({
      featureName: "",
      featureDescription: "",
      featureMustHave: "",
      featureAssignee: "",
    });

    // "Reload" current page
    history.go(0);
  };

  // If still getting data, render the following
  if (!teamMembers.length) {
    return <h3>Loading</h3>;
  }

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

      {/* Feature name input */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="featureName">Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Feature X.1"
          name="featureName"
          onChange={handleInputChange}
          value={featureFormData.featureName}
          required
        />
        <Form.Control.Feedback type="invalid" muted>
          Please add a name for your feature.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Feature description input */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="featureDescription">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={1}
          placeholder="Feature X.1's description."
          name="featureDescription"
          onChange={handleInputChange}
          value={featureFormData.featureDescription}
          required
        />
        <Form.Control.Feedback type="invalid" muted>
          Please add a description for your feature.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Feature must have input */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="featureMustHave">Must have?</Form.Label>
        <Form.Select
          name="featureMustHave"
          onChange={handleInputChange}
          value={featureFormData.featureMustHave}
          required>
          <option defaultValue>Choose an option</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid" muted>
          Please specify whether this feature is a "must have".
        </Form.Control.Feedback>
      </Form.Group>

      {/* Feature assignee input */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="featureAssignee">Assignee</Form.Label>
        <Form.Select
          name="featureAssignee"
          onChange={handleInputChange}
          value={featureFormData.featureAssignee}
          required>
          <option defaultValue>Choose an option</option>
          {teamMembers &&
            teamMembers.map((teamMember) => (
              <option key={teamMember._id} value={teamMember._id}>
                {teamMember.username}
              </option>
            ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid" muted>
          Please assign this feature to one of your team members.
        </Form.Control.Feedback>
      </Form.Group>

      {/* On form submit, create feature */}
      <Button type="submit" variant="success">
        Create
      </Button>
    </Form>
  );
};

export default FeatureForm;
