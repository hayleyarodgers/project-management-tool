import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getAllFeatures, getUser } from "../utils/API";
import Auth from "../utils/auth";

import FeatureList from "../components/FeatureList";
import FeatureForm from "../components/FeatureForm";

const ProjectFeatures = () => {
  // Use `useParams()` to retrieve value of the route parameter `:projectId`
  const { projectId } = useParams();

  const [featureData, setFeatureData] = useState({});
  const [teamMemberData, setTeamMemberData] = useState({});

  // Use to determine if `useEffect()` hooks need to run again
  const featureDataLength = Object.keys(featureData).length;
  const teamMemberDataLength = Object.keys(teamMemberData).length;

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

  return (
    <div>
      <h1>Create project</h1>
      <p>Break down your project into features.</p>
      <FeatureForm teamMembers={teamMemberData} />
      <FeatureList projectId={projectId} features={featureData} />
    </div>
  );
};

export default ProjectFeatures;
