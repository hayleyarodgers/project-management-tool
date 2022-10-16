// Route to get logged in user's info (needs the token)
export const getUserManager = (token) => {
  return fetch("/api/manager/users/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

// Route to create new manager upon sign up
export const signupUserManager = (userData) => {
  return fetch("/api/manager/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// Route to log in existing manager
export const loginUserManager = (userData) => {
  return fetch("/api/manager/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};
