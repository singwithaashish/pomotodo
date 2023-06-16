import { useEffect, useState } from "react";
import { List, Box, Button, Text, Heading } from "grommet";
import { Task, TaskListProps } from "@/typings";
import TaskComponent from "./TaskComponent";
import { useAppState } from "../context/appStateContext";
const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const { state, dispatch } = useAppState();

  const toggleAnimationCompleted = (value : boolean) => {
    console.log(
      animationCompleted, state.isSessionActive
    )
    setAnimationCompleted(value);
  };

  useEffect(() => {
    setAnimationCompleted(false)
  }, [state.isSessionActive])
  
  return !(animationCompleted && state.isSessionActive && state.sessionType === "work") ? (
    <Box pad="medium" style={{
      overflow: "auto",
      // maxHeight: "calc(100vh - ",
      height: "80vh"
    }}>
      {tasks.map((task, i) => (
        <TaskComponent
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          index={i}
          toggleAnimationCompleted={toggleAnimationCompleted}
        />
      ))}
    </Box>
  ) : (
    <Box
      pad="medium"
      style={{
        overflow: "auto",
        maxHeight: "calc(100vh - 200px)",
        color: "white",
      }}
    >
      <Heading level="1" alignSelf="center">FOCUS</Heading>
      <Text size="large" alignSelf="center" color={"grey"} >
        Task: {state.currentTask?.title} 
      </Text>
      <Button
      margin={{
        top: "medium"
      }}
        label="Stop"
        alignSelf="center"
        primary
        onClick={() => {
          dispatch({ type: "END_SESSION" });
          setAnimationCompleted(true);
        }}
      />
    </Box>
  );
};

export default TaskList;
