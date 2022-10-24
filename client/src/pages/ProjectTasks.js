import React, { useState, useEffect } from "react";

// Import bootstrap components
import { Breadcrumb } from "react-bootstrap";

// Import Link component for all internal application hyperlinks
// Import `useParams()` to retrieve value of the route parameter `:projectId`
import { Link, useParams } from "react-router-dom";

// Import components
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

// Import API call and authentication token functions
import { getProject, getFeature, getAllTasks, deleteTask } from "../utils/API";
import Auth from "../utils/auth";

const ProjectTasks = () => {
  // Use `useParams()` to retrieve value of the route parameter `:projectId` and `:featureId`
  const { projectId, featureId } = useParams();

  // Set initial states
  const [projectData, setProjectData] = useState({});
  const [featureData, setFeatureData] = useState({});
  const [taskData, setTaskData] = useState({});

  // Use to determine if `useEffect()` hooks need to run again
  const projectDataLength = Object.keys(projectData).length;
  const featureDataLength = Object.keys(featureData).length;
  const taskDataLength = Object.keys(taskData).length;

  // Get project data
  useEffect(() => {
    const getProjectData = async () => {
      // Since getProject is asynchronous, wrap in a `try...catch` to catch any network errors from throwing due to a failed request
      try {
        // Check token before proceeding
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getProject(projectId, token);

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }

        const project = await response.json();
        setProjectData(project);
      } catch (err) {
        console.error(err);
      }
    };

    getProjectData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectDataLength]);

  // Get feature data
  useEffect(() => {
    const getFeatureData = async () => {
      // Since getFeature is asynchronous, wrap in a `try...catch` to catch any network errors from throwing due to a failed request
      try {
        // Check token before proceeding
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getFeature(projectId, featureId, token);

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }

        const feature = await response.json();
        setFeatureData(feature);
      } catch (err) {
        console.error(err);
      }
    };

    getFeatureData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featureDataLength]);

  // Get task data
  useEffect(() => {
    const getTaskData = async () => {
      // Since getAllTasks is asynchronous, wrap in a `try...catch` to catch any network errors from throwing due to a failed request
      try {
        // Check token before proceeding
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getAllTasks(projectId, featureId, token);

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }

        const tasks = await response.json();
        setTaskData(tasks);
      } catch (err) {
        console.error(err);
      }
    };

    getTaskData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskDataLength]);

  // Handle delete task
  const handleDeleteTask = async (projectId, featureId, taskId) => {
    // Check token before proceeding
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // Since deleteTask and getAllTasks are asynchronous, wrap in a `try...catch` to catch any network errors from throwing due to a failed request
    try {
      const response = await deleteTask(projectId, featureId, taskId, token);

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      const refetch = await getAllTasks(projectId, featureId, token);

      if (!refetch.ok) {
        throw new Error("Something went wrong.");
      }

      const tasks = await response.json();
      setTaskData(tasks);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      {/* Breadcrumb navigation */}
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/myprojects" }}>
          My projects
        </Breadcrumb.Item>
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: `/myprojects/${projectId}` }}>
          {projectData.projectName}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: `/myprojects/${projectId}/features` }}>
          {featureData.featureName}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Add tasks</Breadcrumb.Item>
      </Breadcrumb>
      {/* Page title */}
      <div className="d-flex feature justify-content-between align-items-center">
        <h2>Add tasks</h2>
        {taskData.length >= 1 ? (
          <Link
            className="btn btn-important"
            variant="success"
            to={`/myprojects/${projectId}`}>
            Finish creating project →
          </Link>
        ) : null}
      </div>
      <p>Break down {featureData.featureName} into tasks.</p>
      {/* List displaying tasks in this feature */}
      <TaskList
        projectId={projectId}
        featureId={featureId}
        featureMustHave={featureData.featureMustHave}
        tasks={taskData}
        handleDeleteTask={handleDeleteTask}
      />
      {/* Form for creating tasks in this feature */}
      <TaskForm projectId={projectId} featureId={featureId} />
      <Link to={`/myprojects/${projectId}/features`}>← Back to features</Link>
    </main>
  );
};

export default ProjectTasks;
