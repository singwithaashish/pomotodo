export type Task = {
  updatedAt?: string;
  id?: number;
  title: string;
  completed?: boolean;
  description: string;
  dueDate: string;
  tomatoes: number;
  color: string;
  tomatoes: number;
  timeSpent?: number;
  createdAt?: string;
};

type Filter = {
  sort: "all" | "created" | "updated" | "due";
  show: "all" | "completed" | "overdue";
  order: "asc" | "desc";
}

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


