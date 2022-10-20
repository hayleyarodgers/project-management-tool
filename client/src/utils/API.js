/* --- USER ROUTES ---*/

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

/* --- TEAM MEMBER ROUTES ---*/

// Route to get all of a manager's team members (user must be logged in)
export const getAllManagersTeamMembers = (token) => {
  return fetch("/api/users/myteam", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

// Route to get a team member (user must be logged in)
export const getTeamMember = (teamMemberId, token) => {
  return fetch(`/api/team/${teamMemberId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

// Route to create team member (user must be logged in)
export const createTeamMember = (teamMemberData, token) => {
  return fetch("/api/team", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(teamMemberData),
  });
};

// Route to update team member (user must be logged in)
export const updateTeamMember = (teamMemberId, teamMemberData, token) => {
  return fetch(`/api/team/${teamMemberId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(teamMemberData),
  });
};

// Route to delete team member (user must be logged in)
export const deleteTeamMember = (teamMemberId, token) => {
  return fetch(`/api/team/${teamMemberId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

/* --- PROJECT ROUTES ---*/

// Route to get all of a manager's projects (user must be logged in)
export const getAllManagersProjects = (token) => {
  return fetch("/api/users/myprojects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

// Route to get a project (user must be logged in)
export const getProject = (projectId, token) => {
  return fetch(`/api/projects/${projectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

// Route to create project (user must be logged in)
export const createProject = (projectData, token) => {
  return fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
};

// Route to update project (user must be logged in)
export const updateProject = (projectId, projectData, token) => {
  return fetch(`/api/projects/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
};

// Route to delete project (user must be logged in)
export const deleteProject = (projectId, token) => {
  return fetch(`/api/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

/* --- FEATURE ROUTES ---*/

// Route to get all features in a project (user must be logged in)
export const getAllFeatures = (projectId, token) => {
  return fetch(`/api/projects/${projectId}/features`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

// Route to get a feature in a project (user must be logged in)
export const getFeature = (projectId, featureId, token) => {
  return fetch(`/api/projects/${projectId}/features/${featureId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

// Route to create feature (user must be logged in)
export const createFeature = (projectId, featureData, token) => {
  return fetch(`/api/projects/${projectId}/features`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(featureData),
  });
};

// Route to update feature (user must be logged in)
export const updateFeature = (projectId, featureId, featureData, token) => {
  return fetch(`/api/projects/${projectId}/features/${featureId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(featureData),
  });
};

// Route to delete feature (user must be logged in)
export const deleteFeature = (projectId, featureId, token) => {
  return fetch(`/api/projects/${projectId}/features/${featureId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

/* --- TASK ROUTES ---*/

// Route to get all tasks in a feature (user must be logged in)
export const getAllTasks = (projectId, featureId, token) => {
  return fetch(`/api/projects/${projectId}/features/${featureId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

// Route to get a task in a feature (user must be logged in)
export const getTask = (projectId, featureId, taskId, token) => {
  return fetch(
    `/api/projects/${projectId}/features/${featureId}/tasks/${taskId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
};

// Route to create feature (user must be logged in)
export const createTask = (projectId, featureId, taskData, token) => {
  return fetch(`/api/projects/${projectId}/features/${featureId}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
};

// Route to update feature (user must be logged in)
export const updateTask = (projectId, featureId, taskId, taskData, token) => {
  return fetch(
    `/api/projects/${projectId}/features/${featureId}/tasks/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    }
  );
};

// Route to delete feature (user must be logged in)
export const deleteTask = (projectId, featureId, taskId, token) => {
  return fetch(
    `/api/projects/${projectId}/features/${featureId}/tasks/${taskId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
};
