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
import TaskList from "./TaskList";
import { Filter as FLT, Task } from "@/typings";
import { useAppState } from "../../context/appStateContext";
import Link from "next/link";
import { Filter, User } from "grommet-icons";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { DELETE_TASK, allTasks } from "../../graphql/gqlQueries";
import FilterPopup from "../popups/FilterPopup";

const TaskPage: FC = () => {
  //   const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [filterMenu, setFilterMenu] = useState(false);
  const [deleteTask, { data : delData, loading : delLoading, error: delError }] = useMutation(DELETE_TASK)

  const { state, dispatch } = useAppState();
  const { user } = useUser();
  

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
        {/* <Link href="/dashboard">
          <Button primary label="Dashboard" />
        </Link> */}
        <DropButton
          dropAlign={{ top: "bottom" }}
          icon={<Avatar src={user?.picture ? user.picture : ""} />}
          hoverIndicator
          dropContent={
            <Link href="/api/auth/logout" style={{
              textDecoration: "none",
              backgroundColor: "red",
              color: "#fff",
              padding: "0.5rem",
              borderRadius: "5px"
            }}>
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
