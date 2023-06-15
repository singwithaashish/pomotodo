import { FC, useContext, useEffect, useState } from "react";
import { Box, Heading } from "grommet";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Task } from "@/typings";
import { AppStateContext, useAppState } from "../context/appStateContext";

const TaskPage: FC = () => {
  //   const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const { state, dispatch } = useAppState();

  useEffect(() => {
    // Fetch tasks here and setTasks
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      //   setTasks(data);
      dispatch({ type: "SET_TASKS", tasks: data });
    };
    fetchTasks();
  }, []);

  // inside TaskPage component
  const handleCreateOrUpdate = async (task: Task) => {
    // if (task.id) {
    //   // Update the task
    //   const response = await fetch(`/api/tasks/${task.id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(task),
    //   });
    //   const data = await response.json();

    //   //   setTasks(tasks.map((item) => (item.id === data.id ? data : item)));
    //   dispatch({ type: "UPDATE_TASK", task: data });
    // } else {
    //   // Create a new task
    //   //   console.log(user);
    //   const response = await fetch("/api/tasks", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(task),
    //   });
    //   console.log(response);
    //   const data = await response.json();

    //   //   setTasks([...tasks, data]);
    //   dispatch({ type: "ADD_TASK", task: data });
    // }

    // setCurrentTask(null);
  };

  const handleEdit = (task: Task) => {
    setCurrentTask(task);
  };

  const handleDelete = async (task: Task) => {
    await fetch(`/api/tasks/${task.id}`, {
      method: "DELETE",
    });
    // setTasks(tasks.filter((item) => item.id !== task.id));
    dispatch({ type: "DELETE_TASK", taskId: task.id ? task.id : 0 });
  };

  return (
    <Box>
      <Heading level="3">Todo todo...... ting...... dong</Heading>
      {/* <TaskForm
        task={
          currentTask || {
            title: "",
            description: "",
            dueDate: "",
            tomatoes: 0,
            color: ""
          }
        }
        onSubmit={handleCreateOrUpdate}
      /> */}
      <TaskList
        tasks={state.tasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </Box>
  );
};

export default TaskPage;
