import React from "react";

// Import bootstrap components
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FeatureList = ({ projectId, features, handleDeleteFeature }) => {
  if (!features.length) {
    return <></>;
  }

  return (
    <div id="existing-features">
      {features &&
        features.map((feature) => (
          <Card key={feature._id} className="card mb-3 border-0">
            {feature.featureMustHave ? (
              <Card.Body className="d-flex feature musthave justify-content-between align-items-center">
                <div className="pl-2">
                  <h3>{feature.featureName}</h3>
                  <p>
                    <b>{feature.taskCount}</b> tasks roughly estimated to take{" "}
                    <b>{feature.featureRawTimeEstimate}</b> hours assigned to{" "}
                    <b>{feature.featureAssignee.username}</b>
                  </p>
                </div>
                <div>
                  <Link
                    className="btn mx-3"
                    variant="success"
                    to={`/myprojects/${projectId}/features/${feature._id}`}>
                    Add tasks
                  </Link>
                  <Button
                    className="btn mx-3"
                    variant="success"
                    onClick={() => handleDeleteFeature(projectId, feature._id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            ) : (
              <Card.Body className="d-flex feature justify-content-between align-items-center">
                <div className="pl-2">
                  <h3>{feature.featureName}</h3>
                  <p>
                    <b>{feature.taskCount}</b> tasks roughly estimated to take{" "}
                    <b>{feature.featureRawTimeEstimate}</b> hours assigned to{" "}
                    <b>{feature.featureAssignee.username}</b>
                  </p>
                </div>
                <div>
                  <Link
                    className="btn mx-3"
                    variant="success"
                    to={`/myprojects/${projectId}/features/${feature._id}`}>
                    Add tasks
                  </Link>
                  <Button
                    className="btn mx-3"
                    variant="success"
                    onClick={() => handleDeleteFeature(projectId, feature._id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            )}
          </Card>
        ))}
    </div>
  );
};

export default FeatureList;
