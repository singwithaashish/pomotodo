import { useEffect, useState } from "react";
import { List, Box, Button, Text, Heading, Layer } from "grommet";
import { Task, TaskListProps } from "@/typings";
import TaskComponent from "./TaskComponent";
import { useAppState } from "../context/appStateContext";
import { quotes } from "@/utils/quotes";
import { Add } from "grommet-icons";
import TaskForm from "./TaskForm";
const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const { state, dispatch } = useAppState();
  const [showTodoForm, setShowTodoForm] = useState(false);

  // const toggleAnimationCompleted = (value: boolean) => {
  //   console.log(animationCompleted, state.isSessionActive);
  //   setAnimationCompleted(value);
  // };

  // useEffect(() => {
  //   setAnimationCompleted(false);
  // }, [state.isSessionActive]);

  return (
    <Box
      pad="medium"
      
      
    >
      <Box style={{
        overflow: "scroll",
        // maxHeight: "calc(100vh - ",
        maxHeight: "60vh",
      }}>

      
      {tasks
        .sort((a, b) => {
          if (state.appliedFilters?.sort !== "all") {
            if (state.appliedFilters?.sort === "created") {
              console.log("filtering by created");
              return (
                new Date(a.createdAt!).getTime() -
                new Date(b.createdAt!).getTime()
              );
            } else if (state.appliedFilters?.sort === "due") {
              return (
                new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime()
              );
            } else if (state.appliedFilters?.sort === "updated") {
              return (
                new Date(a.updatedAt!).getTime() -
                new Date(b.updatedAt!).getTime()
              );
            } else if (state.appliedFilters?.sort === "priority") {
              return a.priority === "high"
                ? -1
                : a.priority === "medium"
                ? 0
                : 1;
            } else {
              return 0;
            }
          } else {
            return 0;
          }
        })
        .filter((task) => {
          if (state.appliedFilters?.show !== "all") {
            if (state.appliedFilters?.show === "completed") {
              return task.completed;
            } else if (state.appliedFilters?.show === "overdue") {
              return task.dueDate && new Date(task.dueDate) < new Date();
            } else {
              return (
                !task.completed &&
                (!task.dueDate || new Date(task.dueDate) >= new Date())
              );
            }
          } else {
            return true;
          }
        })
        .sort((a, b) => {
          if (state.appliedFilters?.order === "asc") {
            return (
              new Date(a.createdAt!).getTime() -
              new Date(b.createdAt!).getTime()
            );
          } else {
            return (
              new Date(b.createdAt!).getTime() -
              new Date(a.createdAt!).getTime()
            );
          }
        })
        .map((task, i) => (
          <TaskComponent
            key={task.id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
            index={i}
            setAnimationCompleted={setAnimationCompleted}
            animationCompleted={animationCompleted}
            // toggleAnimationCompleted={toggleAnimationCompleted}
          />
        ))}
        {
          tasks.length === 0 && (
            <Text size="small" margin="small" textAlign="center" color="dark-3">
              No tasks yet. Lets add some!
            </Text>
          )
        }
        </Box>
      <Box
        direction="row"
        align="center"
        justify="center"
        pad="small"
        gap="small"
        onClick={() => {
          setShowTodoForm(true);
        }}
        style={{
          borderBottom: "1px solid #ccc",
          padding: "10px",
          backgroundColor: "#f5f5f5", // adjust color as needed
          borderRadius: "5px",
          minHeight: "4rem",
          marginBottom: "10px",
          overflow: "hidden",
          animation: state.isSessionActive
            ? "fadeOut 0.2s forwards"
            : "fadeIn 0.2s forwards",
        }}
      >
        <Button
          icon={<Add />}
          label="Add"
          color="black" // adjust color as needed
          plain
        />
        {(showTodoForm || state.editingTask?.title) && (
          <Layer
            onEsc={() => setShowTodoForm(false)}
            onClickOutside={() => setShowTodoForm(false)}
            style={{
              overflow: "auto",
            }}
          >
            <Box pad="medium" gap="small" width="medium" >
              <Heading level={3} margin="none">
                Add Todo
              </Heading>
              <TaskForm setShowTodoForm={setShowTodoForm} />
            </Box>
          </Layer>
        )}
      </Box>
      {state.isSessionActive && state.currentTask && animationCompleted && (
        <Text size="small" margin="small" textAlign="center" color="dark-3">
          {quotes[Math.floor(Math.random() * quotes.length)]}
        </Text>
      )}
    </Box>
  );
};

export default TaskList;
