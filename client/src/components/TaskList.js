import React from "react";

// Import bootstrap components
import { Card, Button } from "react-bootstrap";

const TaskList = ({ projectId, featureId, tasks, handleDeleteTask }) => {
  if (!tasks.length) {
    return <></>;
  }

  return (
    <div id="existing-tasks">
      {tasks &&
        tasks.map((task) => (
          <Card key={task._id} className="card mb-3 border-0">
            <Card.Body className="d-flex task justify-content-between align-items-center">
              <h3 className="pl-2">{task.taskName}</h3>
              <Button
                className="btn mx-3"
                variant="success"
                onClick={() =>
                  handleDeleteTask(projectId, featureId, task._id)
                }>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default TaskList;
