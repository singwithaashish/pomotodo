import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form, FormField, TextInput, Box, DateInput } from "grommet";
import { Task } from "@/typings";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useAppState } from "../context/appStateContext";
import { Add, Subtract } from "grommet-icons";
import { parse } from "path";

interface TaskFormProps {
  setShowTodoForm: (show: boolean) => void;
}

const TaskForm = ({ setShowTodoForm }: TaskFormProps) => {
  const { state, dispatch } = useAppState();
  const initialTask = state.editingTask;
  const [task, setTask] = useState<Task>(
    state.editingTask || {
      title: "",
      description: "",
      dueDate: "",
      tomatoes: 0,
      color: "#ea580c",
    }
  );

  useEffect(() => {
    setTask(
      initialTask || {
        title: "",
        description: "",
        dueDate: "",
        tomatoes: 0,
        color: "#ea580c",
      }
    );
  }, [initialTask]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // onSubmit(task);
    if (task.id) {
      // Update the task
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();

      //   setTasks(tasks.map((item) => (item.id === data.id ? data : item)));
      dispatch({ type: "UPDATE_TASK", task: data });
    } else {
      // Create a new task
      //   console.log(user);
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      console.log(response);
      const data = await response.json();

      //   setTasks([...tasks, data]);
      dispatch({ type: "ADD_TASK", task: data });
    }
    // when there is no editing task, the popup closes
    dispatch({
      type: "SET_EDITING_TASK",
      task: {
        title: "",
        description: "",
        dueDate: "",
        tomatoes: 0,
        color: "",
      },
    });
    setShowTodoForm(false);
    //   setCurrentTask(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        name="title"
        htmlFor="text-input-id"
        validate={(value: string) => {
          if (!value || value.trim() === "") {
            return "Title is required";
          }
        }}
      >
        <TextInput
          id="text-input-id"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={task.title}
        />
      </FormField>

      <FormField name="description" htmlFor="text-input-id" validate={(value: string) => {
          if (!value || value.trim() === "") {
            return "\"A short and sweet description please\" - this field";
          }
        }}>
        <TextInput
          id="text-input-id"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={task.description}
        />
      </FormField>

      <FormField name="dueDate" htmlFor="date-input-id" validate={(value: string) => {
          if (!value || value.trim() === "") {
            return "Due Date when again?";
          }
        }}>
        <DateInput
          id="date-input-id"
          name="dueDate"
          format="mm/dd/yyyy"
          placeholder="Due Date"
          onChange={(event) => {
            setTask({
              ...task,
              dueDate: event.value.toString(),
            });
          }}
          value={task.dueDate}
        />
      </FormField>

      {/* <FormField name="color" htmlFor="color-input-id">
        <HexColorPicker
          id="color-input-id"
          color={task.color || "#65a30d"}
          onChange={(color) => {
            setTask({
              ...task,
              color: color,
            });
          }}
        />
      </FormField> */}

      <FormField name="tomatoes" htmlFor="number-input-id" validate={(value: string) => {
          if (!value || parseInt(value) <= 0) {
            return "Tomatoes tomatoes tomatoes, more tomatoes please";
          }
        }
      }>
        <Box direction="row" align="center" gap="small">
          <Button
            icon={<Subtract />}
            onClick={() =>
              setTask({ ...task, tomatoes: Math.max(0, task.tomatoes - 1) })
            }
          />
          <TextInput
            id="number-input-id"
            name="tomatoes"
            type="number"
            min="0"
            value={task.tomatoes }
            onChange={(event) => {
              setTask({
                ...task,
                tomatoes: parseInt(event.target.value),
              });
            }}
          />
          <Button
            icon={<Add />}
            onClick={() => setTask({ ...task, tomatoes: task.tomatoes + 1 })}
          />
        </Box>
      </FormField>

      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Submit" />
        <Button type="reset" label="Reset" />
      </Box>
    </Form>
  );
};

export default TaskForm;
