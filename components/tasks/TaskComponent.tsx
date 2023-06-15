import { Task } from "@/typings";
import { Box, Button, Grid, Text, Menu } from "grommet";
import React, { useEffect, useState } from "react";
import { useAppState } from "../context/appStateContext";
import { More } from "grommet-icons";

interface TaskComponentProps {
  task: Task;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
  index: number;
}

export default function TaskComponent({
  task,
  onDelete,
  onEdit,
  index,
}: TaskComponentProps) {
  const { state, dispatch } = useAppState();
  const [isRunning, setIsRunning] = useState(false);
  const [completedAnimation, setCompletedAnimation] = useState(false);

  useEffect(() => {
    setCompletedAnimation(false);
  }, [state.isSessionActive]);

  useEffect(() => {
    if (
      state.currentTask &&
      state.currentTask.id === task.id &&
      state.isSessionActive
    ) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  }, [state.currentTask, state.isSessionActive]);

  const startWorkSession = () => {
    dispatch({ type: "SET_CURRENT_TASK", task });
    dispatch({ type: "START_SESSION" });
  };

  const stopWorkSession = () => {
    // update time spent on task

    dispatch({ type: "END_SESSION" });
  };

  //   if(state.isSessionActive && completedAnimation && state.currentTask?.id !== task.id){
  //     return <></>
  //   }

  return (
    <Grid
      columns={["auto", "2/4", "1/4"]}
      gap="small"
      style={
        state.isSessionActive && state.currentTask?.id !== task.id
          ? {
              opacity: 1,
              animation: `fadeOut 0.2s ${index * 0.2}s forwards`,
              borderBottom: "1px solid #ccc",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              marginBottom: "10px",
            }
          : {
              opacity: 0,
              animation: `fadeIn 0.2s ${index * 0.2}s forwards`,
              borderBottom: "1px solid #ccc",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              marginBottom: "10px",
            }
      }
      onAnimationEnd={() => setCompletedAnimation(true)}
    >
      <Box direction="column" alignContent="center">
        🍅 x {task.tomatoes}
        <Menu
          alignSelf="center"
          icon={<More />}
          // dropProps={{closeIndicator: false}}
          // label="Actions"
          items={[
            {
              label: "Edit",
              onClick: () => {
                dispatch({ type: "SET_EDITING_TASK", task });
              },
            },
            { label: "Delete", onClick: () => onDelete(task) },
          ]}
        />
      </Box>
      <Box direction="column">
        <Text size="large">{task.title}</Text>
        <Text>{task.description}</Text>
        <Box
          // background="light-3" 
          border={{ color: "black", size: "small" }}
          // round="small"
          // overflow="hidden" 
          height={'10px'}
          style={{width : '100%'}}
        >
          <Box
            // background="brand" 
            height={'10px'}
            style={{width: '100%', backgroundColor: task.color}}
          />
        </Box>
      </Box>
      <Button
        label={isRunning ? "Stop" : "Start"}
        onClick={() => {
          if (isRunning) {
            stopWorkSession();
          } else {
            startWorkSession();
          }
        }}
      />
    </Grid>
  );
}
