import { FC, useEffect, useState } from 'react';
import { Box, Heading } from 'grommet';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Task } from '@/typings';

const TaskPage:FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    // Fetch tasks here and setTasks
  }, []);

  // inside TaskPage component
const handleCreateOrUpdate = async (task:Task) => {
    if (task.id) {
      // Update the task
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      
      setTasks(tasks.map((item) => (item.id === data.id ? data : item)));
    } else {
      // Create a new task
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    console.log(response);
    const data = await response.json();
  
      setTasks([...tasks, data]);
    }
  
    setCurrentTask(null);
  };
  
  const handleEdit = (task:Task) => {
    setCurrentTask(task);
  };
  
  const handleDelete = async (task:Task) => {
    await fetch(`/api/tasks/${task.id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter((item) => item.id !== task.id));
  };
  
  return (
    <Box>
      <Heading level="2">Tasks</Heading>
      <TaskForm task={currentTask || { title: '', description: '', dueDate: '', tomatoes: 0 }} onSubmit={handleCreateOrUpdate} />
      <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
    </Box>
  );
}

export default TaskPage;
  
