import { Task } from "@/typings";
import { Box, Button, Grid, Text, Menu, CheckBox } from "grommet";
import React, { useEffect, useState } from "react";
import { useAppState } from "../context/appStateContext";
import { Checkbox, Clock, More, Time } from "grommet-icons";

interface TaskComponentProps {
  task: Task;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
  index: number;
  setAnimationCompleted: any,
  animationCompleted: boolean;
}

export default function TaskComponent({
  task,
  onDelete,
  onEdit,
  index,
  setAnimationCompleted,
  animationCompleted,
}:
TaskComponentProps) {
  const { state, dispatch } = useAppState();

  useEffect(() => {
    setAnimationCompleted(false);
  }, [state.isSessionActive]);


  return (state.isSessionActive &&
    animationCompleted &&
    state.currentTask?.id !== task.id) ? null : (
    <Box
      direction="row"
      align="center"
      justify="between"
      pad="small"
      gap="small"
      onClick={() => {
        dispatch({ type: "SET_CURRENT_TASK", task });
      }}
      style={
        state.isSessionActive &&
        state.currentTask?.id !== task.id &&
        state.sessionType === "work"
          ? {
              opacity: 1,
              animation: `fadeOut 0.2s ${index * 0.2}s forwards`,
              borderBottom: "1px solid #ccc",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              marginBottom: "10px",
              borderLeft:
                state.currentTask?.id === task.id ? "3px solid green" : "none",
            }
          : {
              opacity: 0,
              animation: `fadeIn 0.2s ${index * 0.2}s forwards`,
              borderBottom: "1px solid #ccc",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              marginBottom: "10px",
              borderLeft:
                state.currentTask?.id === task.id
                  ? "3px solid #ea580c"
                  : "none",
            }
      }
      onAnimationEnd={() => {
        console.log(index, state.tasks.length - 1);
        if ((index + 2 >= state.tasks.length) && state.isSessionActive) {
          // toggleAnimationCompleted(true);
          setAnimationCompleted(true);
          console.log(
            state.isSessionActive,
            animationCompleted,
            state.currentTask?.id !== task.id
          );
        }
      }}
    >
      <Box direction="row" align="center" gap="small">
        <CheckBox
          checked={task.completed}
          onChange={async () => {
            const taskk: Task = { ...task, completed: !task.completed };
            const data = await fetch(`/api/tasks/${task.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(taskk),
            });
            // console.log(data);
            const res = await data.json();
            // console.log(res);
            dispatch({ type: "COMPLETE_TASK", task: res });
          }}
        />
        <Box direction="column">
          <Text weight="bold">{task.title}</Text>
          <Text>{task.description}</Text>
        </Box>
      </Box>
      <Box direction="column" align="end">
        <Box direction="row" gap="small">
          <Text alignSelf="center">🍅 {task.tomatoes}</Text>
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
        <Box direction="row" gap="small">
          {
            [1, 2, 3, 4].map((item, i) => (
              <Box
                key={i}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor:
                    i + 1 < 100 / ((task.timeSpent || 100) * 60)
                      ? "red"
                      : "#ccc",
                }}
              ></Box>
            ))
          }
        </Box>
      </Box>
    </Box>
  );
}
