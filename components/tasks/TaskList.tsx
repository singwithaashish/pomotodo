import { useEffect, useState } from "react";
import { List, Box, Button, Text } from "grommet";
import { Task, TaskListProps } from "@/typings";
import TaskComponent from "./TaskComponent";
const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
  return (
    <Box pad="medium" style={{
      overflow: "auto",
      maxHeight: "calc(100vh - 200px)",
    }}>
      {tasks.map((task, i) => (
        <TaskComponent
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          index={i}
        />
      ))}
    </Box>
  );
};

export default TaskList;
