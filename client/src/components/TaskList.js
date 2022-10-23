import React from "react";

// Import bootstrap components
import { Card, Button } from "react-bootstrap";

const TaskList = ({
  projectId,
  featureId,
  featureMustHave,
  tasks,
  handleDeleteTask,
}) => {
  if (!tasks.length) {
    return <></>;
  }

  return (
    <div id="existing-tasks">
      {tasks &&
        tasks.map((task) => (
          <Card key={task._id} className="card mb-3 border-0">
            {featureMustHave ? (
              <Card.Body className="d-flex task musthave justify-content-between align-items-center">
                <div className="pl-2">
                  <h3>{task.taskName}</h3>
                  <p>
                    Roughly estimated to take <b>{task.taskTimeEstimate}</b>{" "}
                    hours.
                  </p>
                </div>
                <Button
                  className="btn mx-3"
                  variant="success"
                  onClick={() =>
                    handleDeleteTask(projectId, featureId, task._id)
                  }>
                  Delete
                </Button>
              </Card.Body>
            ) : (
              <Card.Body className="d-flex task justify-content-between align-items-center">
                <div className="pl-2">
                  <h3>{task.taskName}</h3>
                  <p>
                    Roughly estimated to take <b>{task.taskTimeEstimate}</b>{" "}
                    hours.
                  </p>
                </div>
                <Button
                  className="btn mx-3"
                  variant="success"
                  onClick={() =>
                    handleDeleteTask(projectId, featureId, task._id)
                  }>
                  Delete
                </Button>
              </Card.Body>
            )}
          </Card>
        ))}
    </div>
  );
};

export default TaskList;
