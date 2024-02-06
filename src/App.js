import React, { useState } from 'react';
import TaskList from './components/Task List/TaskList';
import TaskDetails from './components/Task Details/TaskDetails';
import TaskCreation from './components/Task Creation/TaskCreation';
import TaskUpdate from './components/Task Update/TaskUpdate';

const App = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskCreation, setShowTaskCreation] = useState(false);
  const [showTaskUpdate, setShowTaskUpdate] = useState(false);

  const handleTaskClick = (taskId) => {
    setSelectedTask(taskId);
  };

  const handleTaskCreated = (newTask) => {
    setSelectedTask(null);
    setShowTaskCreation(false);
    // You may update the task list here with the newly created task
    console.log('New task created:', newTask);
  };

  const handleTaskUpdated = (updatedTask) => {
    setSelectedTask(null);
    setShowTaskUpdate(false);
    // You may update the task list here with the updated task
    console.log('Task updated:', updatedTask);
  };

  const handleTaskUpdateCancel = () => {
    setSelectedTask(null);
    setShowTaskUpdate(false);
  };

  return (
    <div>
      {selectedTask ? (
        <TaskDetails
          taskId={selectedTask}
          onBack={() => setSelectedTask(null)}
        />
      ) : showTaskCreation ? (
        <TaskCreation
          onTaskCreated={handleTaskCreated}
        />
      ) : showTaskUpdate ? (
        <TaskUpdate
          taskId={selectedTask}
          onUpdate={handleTaskUpdated}
          onCancel={handleTaskUpdateCancel}
        />
      ) : (
        <TaskList
          onTaskClick={handleTaskClick}
        />
      )}
      <button onClick={() => setShowTaskCreation(!showTaskCreation)}>Create New Task</button>
      {selectedTask && <button onClick={() => setShowTaskUpdate(!showTaskUpdate)}>Update Task</button>}
    </div>
  );
};

export default App;
