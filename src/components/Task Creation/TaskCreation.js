import React, { useState } from 'react';
import '../Task Creation/TaskCreation.css'
const TaskCreation = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = { title, userId, completed: status === 'completed' };
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        onTaskCreated(data);
        setTitle('');
        setUserId('');
        setStatus('');
      })
      .catch(error => console.error('Error creating task:', error));
  };

  return (
    <div>
    <h1>Create New Task</h1>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title:</label>
        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>User ID:</label>
        <input type="number" className="form-control" value={userId} onChange={(e) => setUserId(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Status:</label>
        <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="">Select Status</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Create Task</button>
    </form>
  </div>
  );
};

export default TaskCreation;
