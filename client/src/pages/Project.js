import React, { useState, useEffect } from "react";

// Import bootstrap components
import { Breadcrumb } from "react-bootstrap";

// Import Link component for all internal application hyperlinks
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProjectChart from "../components/ProjectChart";

// Import API calls
import { getProject } from "../utils/API";
import Auth from "../utils/auth";

const Project = () => {
  const [project, setProject] = useState({});
  const [rawHourEstimatesData, setRawHourEstimates] = useState({});
  const [modifiedWeekEstimatesData, setModifiedWeekEstimates] = useState({});

  // Use `useParams()` to retrieve value of the route parameter `:projectId`
  const { projectId } = useParams();

  // Use to determine if `useEffect()` hook needs to run again
  const projectDataLength = Object.keys(project).length;

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
        setProject(project);

        // Create an object containing the total raw hour estimates per user user
        const rawHourEstimates = {};

        for (let i = 0; i < project.features.length; i++) {
          if (project.features[i].featureMustHave === true) {
            const featureAssignee =
              project.features[i].featureAssignee.username;

            const featureRawTimeEstimate =
              project.features[i].featureRawTimeEstimate;

            if (rawHourEstimates[featureAssignee]) {
              const newValue =
                rawHourEstimates[featureAssignee] + featureRawTimeEstimate;
              rawHourEstimates[featureAssignee] = newValue;
            } else {
              rawHourEstimates[featureAssignee] = featureRawTimeEstimate;
            }
          }
        }
        setRawHourEstimates(rawHourEstimates);

        // Create an object containing the total weeks per user by taking their efficiency and hours into account
        const modifiedWeekEstimates = {};

        for (let i = 0; i < project.features.length; i++) {
          if (project.features[i].featureMustHave === true) {
            const featureAssignee =
              project.features[i].featureAssignee.username;

            const rawTimeEstimate = project.features[i].featureRawTimeEstimate;
            const assigneeEfficiency =
              project.features[i].featureAssignee.efficiency;
            const assigneeHours =
              project.features[i].featureAssignee.hoursPerWeek;

            const hours = rawTimeEstimate * assigneeEfficiency;
            const weeks = hours / assigneeHours;

            if (modifiedWeekEstimates[featureAssignee]) {
              const newValue = modifiedWeekEstimates[featureAssignee] + weeks;
              modifiedWeekEstimates[featureAssignee] = newValue;
            } else {
              modifiedWeekEstimates[featureAssignee] = weeks;
            }
          }
        }
        setModifiedWeekEstimates(modifiedWeekEstimates);
      } catch (err) {
        console.error(err);
      }
    };

    getProjectData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectDataLength]);

  return (
    <main>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/myprojects" }}>
          My projects
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{project.projectName}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="d-flex feature justify-content-between align-items-center">
        <h2>{project.projectName}</h2>
        <Link className="btn" to={`/myprojects/${projectId}/features`}>
          Edit project
        </Link>
      </div>
      <ProjectChart
        projectId={projectId}
        rawHourEstimates={rawHourEstimatesData}
        modifiedWeekEstimates={modifiedWeekEstimatesData}
      />
    </main>
  );
};

export default Project;
