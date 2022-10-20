import React from "react";
import { Link } from "react-router-dom";

const FeatureList = ({ projectId, features }) => {
  if (!features.length) {
    return <h3>No features yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {features &&
          features.map((feature) => (
            <div key={feature._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {feature.featureName}
                </h4>
                <Link
                  className="btn"
                  to={`/myprojects/${projectId}/features/${feature._id}`}>
                  Break this feature down into tasks.
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeatureList;
