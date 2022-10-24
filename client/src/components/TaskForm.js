import React, { useState } from "react";

// Import bootstrap components
import { Form, Button, Alert } from "react-bootstrap";

// Import `useHistory()` to access and edit browser history
import { useHistory } from "react-router-dom";

// Import API call and authentication token functions
import { createTask } from "../utils/API";
import Auth from "../utils/auth";

const TaskForm = ({ projectId, featureId }) => {
  // Use `useHistory()` to access and edit browser history
  const history = useHistory();

  // Set initial form state
  const [taskFormData, setTaskFormData] = useState({
    taskName: "",
    taskAcceptanceCriteria: "",
    taskTimeEstimate: 0,
  });
  // Set state for form validation
  const [validated] = useState(false);
  // Set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // When the input of any form field changes, set form data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskFormData({ ...taskFormData, [name]: value });
  };

  // Create new task
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

    // Since createTask is asynchronous, wrap in a `try...catch` to catch any network errors from throwing due to a failed request
    try {
      const response = await createTask(
        projectId,
        featureId,
        taskFormData,
        token
      );

      if (!response.ok) {
        throw new Error("Something went wrong when creating task.");
      }
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // Reset form data
    setTaskFormData({
      taskName: "",
      taskAcceptanceCriteria: "",
      taskTimeEstimate: 0,
    });

    // "Reload" current page
    history.go(0);
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

      {/* Task name input */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="taskName">Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Task X.1.1"
          name="taskName"
          onChange={handleInputChange}
          value={taskFormData.taskName}
          required
        />
        <Form.Control.Feedback type="invalid" muted>
          Please add a name for your task.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Task acceptance criteria input */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="taskAcceptanceCriteria">
          Acceptance criteria
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder={`GIVEN...
WHEN...
THEN...`}
          name="taskAcceptanceCriteria"
          onChange={handleInputChange}
          value={taskFormData.taskAcceptanceCriteria}
          required
        />
        <Form.Control.Feedback type="invalid" muted>
          Please add acceptance criteria for your task.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Task time estimate input */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="taskTimeEstimate">Time estimate (h)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Estimated time to complete task"
          name="taskTimeEstimate"
          min="0"
          onChange={handleInputChange}
          value={taskFormData.taskTimeEstimate}
          required
        />
        <Form.Text muted>
          Must be written in hours in a decimal format, eg. for 10 hours and 30
          minutes, enter 10.5.
        </Form.Text>
        <Form.Control.Feedback type="invalid" muted>
          Please add a time estimate.
        </Form.Control.Feedback>
      </Form.Group>

      {/* On form submit, create task */}
      <Button type="submit" variant="success">
        Create
      </Button>
    </Form>
  );
};

export default TaskForm;
