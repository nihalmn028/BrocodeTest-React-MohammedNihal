import React, { useState, useEffect } from 'react';

const TaskList = ({ onTaskClick }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id} onClick={() => onTaskClick(task.id)}>
            <strong>Title:</strong> {task.title}<br />
            <strong>User:</strong> {task.userId}<br />
            <strong>Status:</strong> {task.completed ? 'Completed' : 'Incomplete'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
