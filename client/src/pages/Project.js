import React, { useState, useEffect } from "react";

// Import bootstrap components
// import { Row, Col, Card } from "react-bootstrap";

// Import Link component for all internal application hyperlinks
// import { Link } from "react-router-dom";
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
  }, [projectId]);

  return (
    <main>
      <h1>{project.projectName} page</h1>
    </main>
  );
};

export default Project;

// Want an object
// {
//   "username1": 32,
//   "id459859845": 12,
//   "id459859845": 2,
//   "id346934868": 20,
//   "id458745784": 10,
// }
// For each project.features
// If project.features[i].featureMustHave = true
// Get featureAssignee and featureAssigneeTimeEstimate
// Push to object

//Manager
//634faf8d70a461ddd2a459cf

//Teammembers
// 6350a8ca8f6a9f522d10f30c
// 6350a8d78f6a9f522d10f30f
// 6350a8e88f6a9f522d10f312

// const featureRawTimeEstimate = console.log(featureRawTimeEstimate);
// const featureAssigneeEfficiency = this.featureAssignee.efficiency;
// console.log(featureAssigneeEfficiency);

// const featureAssigneeTimeEstimate =
//   featureRawTimeEstimate * featureAssigneeEfficiency;
// console.log(featureAssigneeTimeEstimate);
// const featureAssigneeHours = this.featureAssignee.hoursPerWeek;
// console.log(featureAssigneeHours);

// return featureAssigneeTimeEstimate / featureAssigneeHours;
