export type Task = {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  color: string;
  tomatoes: number;
  timeSpent?: number;
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

export type WorkDay = {
    id?: number;
    date: string;
    totalSeconds: number;
    userId: string;
}


