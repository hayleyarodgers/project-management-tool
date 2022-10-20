import React from "react";
import { Link } from "react-router-dom";

const TaskList = ({ projectId, tasks }) => {
  if (!tasks.length) {
    return <h3>No tasks yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {tasks &&
          tasks.map((task) => (
            <div key={task._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {task.taskName}
                </h4>
              </div>
            </div>
          ))}
      </div>
      <Link className="btn" to={`/myprojects/${projectId}/features`}>
        Go back to features.
      </Link>
    </div>
  );
};

export default TaskList;
