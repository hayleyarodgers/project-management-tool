import React, { useState, useEffect } from "react";

// Import bootstrap components
import { Breadcrumb } from "react-bootstrap";

// Import Link component for all internal application hyperlinks
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// Import API calls
import { getProject } from "../utils/API";
import Auth from "../utils/auth";

const Project = () => {
  const [project, setProject] = useState({});
  const [estimateDataPoints, setEstimateDataPoints] = useState({});

  // Use `useParams()` to retrieve value of the route parameter `:projectId`
  const { projectId } = useParams();

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

        const featureWeekEstimates = {};

        for (let i = 0; i < project.features.length; i++) {
          if (project.features[i].featureMustHave === true) {
            const featureId = project.features[i]._id;

            const rawTimeEstimate = project.features[i].featureRawTimeEstimate;
            const assigneeEfficiency =
              project.features[i].featureAssignee.efficiency;
            const assigneeHours =
              project.features[i].featureAssignee.hoursPerWeek;

            const modifiedTimeEstimate = rawTimeEstimate * assigneeEfficiency;
            const weeks = modifiedTimeEstimate / assigneeHours;

            featureWeekEstimates[featureId] = weeks;
          }
        }
        console.log(estimateDataPoints);
        setEstimateDataPoints(featureWeekEstimates);
      } catch (err) {
        console.error(err);
      }
    };

    getProjectData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

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
      <h2>{project.projectName} page</h2>
    </main>
  );
};

export default Project;
