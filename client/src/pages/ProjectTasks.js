import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Import bootstrap components
import { Breadcrumb } from "react-bootstrap";

// Import Link component for all internal application hyperlinks
import { Link } from "react-router-dom";

import { getProject, getFeature, getAllTasks, deleteTask } from "../utils/API";
import Auth from "../utils/auth";

import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const ProjectTasks = () => {
  // Use `useParams()` to retrieve value of the route parameter `:projectId` and `:featureId`
  const { projectId, featureId } = useParams();

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
      try {
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
      try {
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
      try {
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
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

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
      <TaskList
        projectId={projectId}
        featureId={featureId}
        featureMustHave={featureData.featureMustHave}
        tasks={taskData}
        handleDeleteTask={handleDeleteTask}
      />
      <TaskForm projectId={projectId} featureId={featureId} />
      <Link to={`/myprojects/${projectId}/features`}>← Back to features</Link>
    </main>
  );
};

export default ProjectTasks;
