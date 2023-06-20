import { Task } from "@/typings";
import {
  Box,
  Button,
  Grid,
  Text,
  Menu,
  CheckBox,
  ResponsiveContext,
} from "grommet";
import React, { useEffect, useState } from "react";
import { useAppState } from "../../context/appStateContext";
import {
  Checkbox,
  Clock,
  InProgress,
  More,
  StatusCritical,
  StatusGood,
  StatusWarning,
  Time,
} from "grommet-icons";
import { useMutation } from "@apollo/client";
import { MARK_CHECKED, UPDATE_TASK } from "../../data/gqlFetch";

interface TaskComponentProps {
  task: Task;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
  index: number;
  setAnimationCompleted: any;
  animationCompleted: boolean;
}

export default function TaskComponent({
  task,
  onDelete,
  onEdit,
  index,
  setAnimationCompleted,
  animationCompleted,
}: TaskComponentProps) {
  const { state, dispatch } = useAppState();
  const [updateTaskgql, { data, loading, error }] = useMutation(UPDATE_TASK);

  useEffect(() => {
    setAnimationCompleted(false);
  }, [state.isSessionActive]);

  useEffect(() => {
    if (data) {
      dispatch({ type: "UPDATE_TASK", task: data.updateTask });
    }
  }, [data]);

  return state.isSessionActive &&
    animationCompleted &&
    state.currentTask?.id !== task.id ? null : (
    <Box
      direction="row"
      align="center"
      justify="between"
      pad="small"
      gap="small"
      onClick={() => {
        dispatch({ type: "SET_CURRENT_TASK", task });
      }}
      style={{
        opacity:
          state.isSessionActive &&
          state.currentTask?.id !== task.id &&
          state.sessionType === "work"
            ? 1
            : 0,
        animation:
          state.isSessionActive &&
          state.currentTask?.id !== task.id &&
          state.sessionType === "work"
            ? `fadeOut 0.2s ${index * 0.2}s forwards`
            : `fadeIn 0.2s ${index * 0.2}s forwards`,
        borderBottom: "1px solid #ccc",
        padding: "10px",
        backgroundColor: "#fff",
        borderRadius: "5px",
        marginBottom: "10px",
        minHeight: "4rem",
        borderLeft:
          state.currentTask?.id === task.id ? "3px solid #ea580c" : "none",
      }}
      onAnimationEnd={() => {
        if (index + 2 >= state.tasks.length && state.isSessionActive) {
          setAnimationCompleted(true);
        }
      }}
    >
      <Box direction="row" align="center" gap="small">
        <Box direction="column" align="center" justify="center">
          {
            loading ? <InProgress/> : 
          
          <CheckBox
            checked={task.completed}
            onChange={async () => {
              const taskk: Task = { ...task, completed: !task.completed };
              try{
              const res = await updateTaskgql({
                variables: {...taskk},
              });
              console.log(res);
              } catch(e) {
                console.log(e)
              }

            }}
          />
}
        </Box>
        <Box direction="column" justify="start">
          <ResponsiveContext.Consumer>
            {(size) => (
              <Text
                weight="normal"
                style={{
                  display: size === "small" ? "block" : "flex",
                  gap: "5px",
                }}
                color={task.completed ? "gray" : "black"}
              >
                {task.title}
              </Text>
            )}
          </ResponsiveContext.Consumer>
            <PriorityIcon priority={task.priority} />
          <Text
            style={{
              fontSize: "12px",
              color: "#aaa",
            }}
          >
            {task.description}
          </Text>
        </Box>
      </Box>
      <Box direction="column" align="end">
        <Box direction="row"  >
          <Text alignSelf="center" style={{
          minWidth: '2.6rem',
        }}>🍅 {task.tomatoes}</Text>
          <Menu
            alignSelf="center"
            icon={<More />}
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
          {[1, 2, 3, 4].map((item, i) => (
            <Box
              key={i}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor:
                  i < ((task.timeSpent||0)/25) ? "red" : "#ccc",
              }}
            ></Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

interface PriorityIconProps {
  priority: string;
}

const PriorityIcon = ({ priority }: PriorityIconProps) => {
  return (
    <Box
      background={"light-2"}
      style={{
        borderRadius: "5px",
        maxWidth: "fit-content",
        maxHeight: "1.5rem",
      }}
    >
      <Text
        size="small"
        weight={"lighter"}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <StatusWarning
          color={priority === "low" ? "orange" : "red"}
          size="small"
          style={{
            marginRight: "5px",
          }}
        />
        {priority}
      </Text>
    </Box>
  );
};
