import { Task } from "@/typings";
import React, { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";

type State = {
  tasks: Task[];
  currentTask: Task | null;
  editingTask: Task | null;
  currentSession: number;
  isSessionActive: boolean;
  sessionType: "work" | "shortBreak" | "longBreak";
};

type Action =
  | { type: "SET_TASKS"; tasks: Task[] }
  | { type: "ADD_TASK"; task: Task }
  | { type: "UPDATE_TASK"; task: Task }
  | { type: "DELETE_TASK"; taskId: number }
  | { type: "SET_EDITING_TASK"; task: Task }
  | { type: "SET_CURRENT_TASK"; task: Task }
  | { type: "INCREMENT_CURRENT_SESSION" }
  | { type: "START_SESSION" }
  | { type: "END_SESSION" }
  | {
      type: "SET_SESSION_TYPE";
      sessionType: "work" | "shortBreak" | "longBreak";
    };

const initialState: State = {
  tasks: [],
  currentTask: null,
  editingTask: null,
  currentSession: 0,
  isSessionActive: false,
  sessionType: "work",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.tasks };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.task] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.task.id ? action.task : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.taskId),
      };
    case "SET_EDITING_TASK":
      return { ...state, editingTask: action.task };
    case "SET_CURRENT_TASK":
      return { ...state, currentTask: action.task };
    case "INCREMENT_CURRENT_SESSION":
      return { ...state, currentSession: state.currentSession + 1 };
    case "START_SESSION":
      return { ...state, isSessionActive: true };
    case "END_SESSION":
      return { ...state, isSessionActive: false };
    case "SET_SESSION_TYPE":
      return { ...state, sessionType: action.sessionType };
    default:
      return state;
  }
}

export const AppStateContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);


export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}


export function useAppState() {
  const context = useContext(AppStateContext);
  
  if (!context) {
    throw new Error("useAppState must be used within a AppStateProvider");
  }

  return context;
}

