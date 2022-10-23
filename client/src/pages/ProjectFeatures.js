import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Import bootstrap components
import { Breadcrumb } from "react-bootstrap";

// Import Link component for all internal application hyperlinks
import { Link } from "react-router-dom";

import {
  getProject,
  getAllFeatures,
  getUser,
  deleteFeature,
} from "../utils/API";
import Auth from "../utils/auth";

import FeatureList from "../components/FeatureList";
import FeatureForm from "../components/FeatureForm";

const ProjectFeatures = () => {
  // Use `useParams()` to retrieve value of the route parameter `:projectId`
  const { projectId } = useParams();

  const [projectData, setProjectData] = useState({});
  const [featureData, setFeatureData] = useState({});
  const [teamMemberData, setTeamMemberData] = useState({});

  // Use to determine if `useEffect()` hooks need to run again
  const projectDataLength = Object.keys(projectData).length;
  const featureDataLength = Object.keys(featureData).length;
  const teamMemberDataLength = Object.keys(teamMemberData).length;

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

        const response = await getAllFeatures(projectId, token);

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }

        const features = await response.json();
        setFeatureData(features);
      } catch (err) {
        console.error(err);
      }
    };

    getFeatureData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featureDataLength]);

  // Get team member data
  useEffect(() => {
    const getTeamMemberData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getUser(token);

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }

        const user = await response.json();
        const teamMembers = user.teamMembers;
        setTeamMemberData(teamMembers);
      } catch (err) {
        console.error(err);
      }
    };

    getTeamMemberData();
  }, [teamMemberDataLength]);

  // Handle delete feature
  const handleDeleteFeature = async (projectId, featureId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteFeature(projectId, featureId, token);

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      const refetch = await getAllFeatures(projectId, token);

      if (!refetch.ok) {
        throw new Error("Something went wrong.");
      }

      const features = await response.json();
      setFeatureData(features);
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
        <Breadcrumb.Item active>Add features</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Add features</h2>
      <p>Break down {projectData.projectName} into features.</p>
      <FeatureList
        projectId={projectId}
        features={featureData}
        handleDeleteFeature={handleDeleteFeature}
      />
      <FeatureForm projectId={projectId} teamMembers={teamMemberData} />
    </main>
  );
};

export default ProjectFeatures;
