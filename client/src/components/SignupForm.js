import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import { signupUser } from "../utils/API";
import Auth from "../utils/auth";
import { saveUserId } from "../utils/localStorage";

const SignupForm = () => {
  // Set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // Set state for form validation
  const [validated] = useState(false);
  // Set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Since signupUser is asynchronous, wrap in a `try...catch` to catch any network errors from throwing due to a failed request
    try {
      const response = await signupUser(userFormData);

      if (!response.ok) {
        throw new Error("Something went wrong during sign up.");
      }

      const { token, user } = await response.json();
      console.log(user);
      saveUserId(user._id);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger">
          Something went wrong with your sign up.
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please add a username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please add a valid email address.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please add a password.
          </Form.Control.Feedback>
        </Form.Group>
        <br />

        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default SignupForm;
