import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form, FormField, TextInput, Box, DateInput } from "grommet";
import { Task, TaskFormProps } from "@/typings";





const TaskForm = ({ task: initialTask, onSubmit }: TaskFormProps) => {
  const [task, setTask] = useState<Task>(
    initialTask || { title: "", description: "", dueDate: "", tomatoes: 0 }
  );
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    setTask(
      initialTask || { title: "", description: "", dueDate: "", tomatoes: 0 }
    );
  }, [initialTask]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(task);
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
