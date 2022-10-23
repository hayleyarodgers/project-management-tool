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
            <Card.Body className="d-flex feature justify-content-between align-items-center">
              <h3 className="pl-2">{feature.featureName}</h3>
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
          </Card>
        ))}
    </div>
  );
};

export default FeatureList;
