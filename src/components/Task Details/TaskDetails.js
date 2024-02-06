import React, { useState, useEffect } from 'react';

const TaskDetails = ({ taskId, onBack }) => {
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`)
      .then(response => response.json())
      .then(data => setTask(data))
      .catch(error => console.error('Error fetching task details:', error));
  }, [taskId]);

  return (
    <div>
      <h1>Task Details</h1>
      {task ? (
        <div>
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>User:</strong> {task.userId}</p>
          <p><strong>Status:</strong> {task.completed ? 'Completed' : 'Incomplete'}</p>
          <button onClick={onBack}>Back to Task List</button>
        </div>
      ) : (
        <p>Loading task details...</p>
      )}
    </div>
  );
};

export default TaskDetails;
