export type Task = {
  updatedAt?: string;
  id?: number;
  title: string;
  completed?: boolean;
  description: string;
  dueDate: string;
  tomatoes: number;
  priority: "low" | "medium" | "high";
  tomatoes: number;
  timeSpent?: number;
  createdAt?: string;
  customField?: {
    name: string;
    value: string;
  }
};

type Filter = {
  sort: "all" | "created" | "updated" | "due" | "priority";
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


