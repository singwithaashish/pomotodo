import { FC, useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  DropButton,
  Heading,
  Layer,
  Select,
  Text,
} from "grommet";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Filter as FLT, Task } from "@/typings";
import { useAppState } from "../context/appStateContext";
import Link from "next/link";
import { Filter, User } from "grommet-icons";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { DELETE_TASK, allTasks } from "../data/gqlFetch";
import FilterPopup from "../popups/FilterPopup";

const TaskPage: FC = () => {
  //   const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [filterMenu, setFilterMenu] = useState(false);
  const [deleteTask, { data : delData, loading : delLoading, error: delError }] = useMutation(DELETE_TASK)

  const { state, dispatch } = useAppState();
  const { data, loading, error } = useQuery(allTasks);
  const { user } = useUser();

  useEffect(() => {
    if (data) {
      const tasks: Task[] = data.tasks.map((task: Task) => {
        return {
          id: task.id,
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          tomatoes: task.tomatoes,
          priority: task.priority,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          completed: task.completed,
          timeSpent: task.timeSpent,
        };
      });

      dispatch({ type: "SET_TASKS", tasks: tasks });
      console.log(state.tasks);
    }
  }, [data]);

  useEffect(() => {
    if (delData) {
      dispatch({ type: "DELETE_TASK", taskId: delData.deleteTask.id })
    }
  }
  , [delData])

  const handleEdit = (task: Task) => {
    setCurrentTask(task);
  };


  // why pass it all the way down to TaskList? because once task is deleted, we need to update the state
  const handleDelete = async (task: Task) => {
    // await fetch(`/api/tasks/${task.id}`, {
    //   method: "DELETE",
    // });
    // // setTasks(tasks.filter((item) => item.id !== task.id));
    // dispatch({ type: "DELETE_TASK", taskId: task.id ? task.id : 0 });
    await deleteTask({
      variables: {
        id: task.id,
      }
    })
  };

  return (
    <Box>
      <Box
        direction="row"
        justify="between"
        align="center"
        style={{
          animation: state.isSessionActive
            ? "fadeOut 0.2s forwards"
            : "fadeIn 0.2s forwards",
        }}
      >
        <Box direction="row" align="center" gap="small">
          <Heading level="3">Tasks</Heading>
          <Button icon={<Filter />} onClick={() => setFilterMenu(true)} />
          {filterMenu && (
            <FilterPopup setFilterMenu={() => setFilterMenu(false)}  />
          )}
        </Box>
        <Link href="/dashboard">
          <Button primary label="Dashboard" />
        </Link>
        <DropButton
          dropAlign={{ top: "bottom" }}
          icon={<Avatar src={user?.picture ? user.picture : ""} />}
          dropContent={
            <Link href="/api/auth/logout">
              <Text>Logout</Text>
            </Link>
          }
        />
      </Box>
      <TaskList
        tasks={state.tasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </Box>
  );
};

export default TaskPage;
