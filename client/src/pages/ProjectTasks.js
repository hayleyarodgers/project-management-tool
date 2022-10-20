import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getAllTasks } from "../utils/API";
import Auth from "../utils/auth";

import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const ProjectTasks = () => {
  // Use `useParams()` to retrieve value of the route parameter `:projectId` and `:featureId`
  const { projectId, featureId } = useParams();

  const [taskData, setTaskData] = useState({});

  // Use to determine if `useEffect()` hooks need to run again
  const taskDataLength = Object.keys(taskData).length;

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
  }, [taskDataLength]);

  return (
    <div>
      <h1>Create project</h1>
      <p>Break down your features into tasks.</p>
      <TaskForm projectId={projectId} featureId={featureId} />
      <TaskList projectId={projectId} tasks={taskData} />
    </div>
  );
};

export default ProjectTasks;
