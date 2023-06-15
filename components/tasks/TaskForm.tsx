import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form, FormField, TextInput, Box, DateInput } from "grommet";
import { Task } from "@/typings";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useAppState } from "../context/appStateContext";



interface TaskFormProps {
    setShowTodoForm: (show: boolean) => void;
}

const TaskForm = ({setShowTodoForm} : TaskFormProps) => {
    const {state, dispatch} = useAppState();
    const initialTask = state.editingTask;
  const [task, setTask] = useState<Task>(
    state.editingTask || { title: "", description: "", dueDate: "", tomatoes: 0, color: "" }
  );

  useEffect(() => {
    setTask(
      initialTask || { title: "", description: "", dueDate: "", tomatoes: 0, color: "" }
    );
  }, [initialTask]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value
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
      dispatch({type: "SET_EDITING_TASK", task: {
        title: "",
        description: "",
        dueDate: "",
        tomatoes: 0,
        color: ""
      }});
      setShowTodoForm(false);
    //   setCurrentTask(null);
  };


  return (
    <Form onSubmit={handleSubmit}>
      <FormField name="title" htmlFor="text-input-id" label="Title">
        <TextInput id="text-input-id" name="title"  onChange={handleChange} value={task.title} />
      </FormField>
      <FormField name="description" htmlFor="text-input-id" label="Description">
        <TextInput id="text-input-id" name="description" onChange={handleChange} value={task.description} />
      </FormField>
      <FormField name="dueDate" htmlFor="date-input-id" label="Due Date">
        <DateInput id="date-input-id" name="dueDate" format="mm/dd/yyyy" onChange={
            (event) => {
                setTask({
                    ...task,
                    dueDate: event.value.toString()
                })
            }
        } value={task.dueDate} />
      </FormField>
      
      <FormField name="color" htmlFor="color-input-id" label="Color">
        <HexColorPicker id="color-input-id" onChange={
            (event) => {
                setTask({
                    ...task,
                    color: event
                })
            }
        } color={task.color} />
        
        </FormField>
      <FormField name="tomatoes" htmlFor="number-input-id" label="Tomatoes">
        <input
          id="number-input-id"
          name="tomatoes"
          type="number"
          min="0"
          onChange={
            (event) => {
                setTask({
                    ...task,
                    tomatoes: parseInt(event.target.value)
                })
            }
          }
            value={task.tomatoes}
        />
      </FormField>
      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Submit" />
        <Button type="reset" label="Reset" />
      </Box>
    </Form>
  );
};

export default TaskForm;
