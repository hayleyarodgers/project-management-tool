// Route to get logged in user's info (needs the token)
export const getUser = (token) => {
  return fetch("/api/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

// Route to create new user upon sign up
export const signupUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// Route to log in existing user
export const loginUser = (userData) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// Route to get all of a manager's team members
export const getAllManagersTeamMembers = (token) => {
  return fetch("/api/user/myteam", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

// Route to get all of a manager's projects
export const getAllManagersProjects = (token) => {
  return fetch("/api/user/myprojects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
