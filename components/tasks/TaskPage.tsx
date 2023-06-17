import { FC, useContext, useEffect, useState } from "react";
import { Box, Button, DropButton, Heading, Layer, Select, Text } from "grommet";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Filter as FLT, Task } from "@/typings";
import { AppStateContext, useAppState } from "../context/appStateContext";
import Link from "next/link";
import { Filter, User } from "grommet-icons";

const TaskPage: FC = () => {
  //   const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [filterMenu, setFilterMenu] = useState(false);

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
            <Layer
              onEsc={() => setFilterMenu(false)}
              onClickOutside={() => setFilterMenu(false)}
              style={{
                overflow: "auto",
              }}
            >
              <Box pad="medium" gap="small" width="medium">
                <Heading level={3} margin="none">
                  Apply Filter
                </Heading>
                <Text>Filter by</Text>
                <Select
                  options={["all", "overdue", "completed"]}
                  value={state.appliedFilters?.show}
                  onChange={({ option }) => {
                    dispatch({
                      type: "SET_FILTERS",
                      filters: {
                        ...state.appliedFilters,
                        show: option,
                      } as FLT,
                    });
                  }}
                />
                <Text>Sort by</Text>
                <Select
                  options={["all","created", "updated", "due"]}
                  value={state.appliedFilters?.sort}
                  onChange={({ option }) => {
                    dispatch({
                      type: "SET_FILTERS",
                      filters: {
                        ...state.appliedFilters,
                        sort: option,
                      } as FLT,
                    });
                  }}
                />
                <Text>Order</Text>
                <Select
                  options={["asc", "desc"]}
                  value={state.appliedFilters?.order}
                  onChange={({ option }) => {
                    dispatch({
                      type: "SET_FILTERS",
                      filters: {
                        ...state.appliedFilters,
                        order: option,
                      } as FLT,
                    });
                  }}
                />
                <Button label="Apply" onClick={() => setFilterMenu(false)} />
              </Box>
            </Layer>
          )}
        </Box>
        <Link href="/dashboard">
          <Button primary label="Dashboard" />
        </Link>
        <DropButton
          dropAlign={{ top: "bottom" }}
          icon={<User />}
          dropContent={
            <Box
              pad="large"
              onClick={() => {
                window.location.href = "/api/auth/logout";
              }}
            >
              <Text>Logout</Text>
            </Box>
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
