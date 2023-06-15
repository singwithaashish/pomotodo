export type Task = {
  id?: string;
  title: string;
  description: string;
  dueDate: string;
  tomatoes: number;
};

export type TaskFormProps = {
  task: Task | null;
  onSubmit: (task: Task) => void;
};

type TaskListProps = {
  tasks: Task[];
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
};
