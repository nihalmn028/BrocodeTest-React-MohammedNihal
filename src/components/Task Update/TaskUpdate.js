import React, { useState, useEffect } from 'react';

const TaskUpdate = ({ taskId, onUpdate, onCancel }) => {
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`)
      .then(response => response.json())
      .then(data => {
        setTask(data);
        setTitle(data.title);
        setUserId(data.userId);
        setStatus(data.completed ? 'completed' : 'incomplete');
      })
      .catch(error => console.error('Error fetching task details:', error));
  }, [taskId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTask = { id: taskId, title, userId, completed: status === 'completed' };
    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTask),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        onUpdate(data);
      })
      .catch(error => console.error('Error updating task:', error));
  };

  return (
    <div>
      <h1>Update Task</h1>
      {task ? (
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /><br />
          <label>User ID:</label>
          <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} required /><br />
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select><br />
          <button type="submit">Update Task</button>
          <button onClick={onCancel}>Cancel</button>
        </form>
      ) : (
        <p>Loading task details...</p>
      )}
    </div>
  );
};

export default TaskUpdate;
