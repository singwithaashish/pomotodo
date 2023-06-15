import { useEffect, useState } from 'react';
import { List, Box, Button, Text } from 'grommet';
import { Task, TaskListProps } from '@/typings';
const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
    return (
      <Box pad="medium">
        {tasks.map((task) => (
          <Box
            key={task.id}
            direction="row"
            align="center"
            justify="between"
            pad="medium"
            border={{ size: 'small' }}
          >
            <Box direction="column">
              <Text size="large">{task.title}</Text>
              <Text>{task.description}</Text>
            </Box>
            <Box direction="row">
              <Button label="Edit" onClick={() => onEdit(task)} />
              <Button label="Delete" onClick={() => onDelete(task)} />
            </Box>
          </Box>
        ))}
      </Box>
    );
  };
  
  

export default TaskList;
