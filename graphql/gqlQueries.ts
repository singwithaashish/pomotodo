import { gql } from "@apollo/client";

export const allTasks = gql`
  query {
    tasks {
      id
      title
      description
      dueDate
      tomatoes
      priority
      createdAt
      updatedAt
      completed
      timeSpent
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask(
    $title: String!
    $description: String!
    $dueDate: DateTime!
    $priority: String!
    $tomatoes: Int!
  ) {
    createTask(
      title: $title
      description: $description
      dueDate: $dueDate
      priority: $priority
      tomatoes: $tomatoes
    ) {
      id
      title
      description
      dueDate
      tomatoes
      priority
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: Int!
    $title: String!
    $description: String!
    $dueDate: DateTime!
    $priority: String!
    $tomatoes: Int!
    $completed: Boolean!
    $timeSpent: Int!
  ) {
    updateTask(
      id: $id
      title: $title
      description: $description
      dueDate: $dueDate
      priority: $priority
      tomatoes: $tomatoes
      completed: $completed
      timeSpent: $timeSpent
    ) {
      id
      title
      description
      dueDate
      tomatoes
      priority
      completed
      timeSpent
    }
  }
`;

export const MARK_CHECKED = gql`
  mutation UpdateTask($id: Int!, $completed: Boolean!) {
    updateTask(id: $id, completed: $completed) {
      id
      title
      description
      dueDate
      tomatoes
      priority
      completed
      timeSpent
    }
  }
`;


export const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

export const GET_TASK = gql`
  query GetTask($id: Int!) {
    task(id: $id) {
      id
      title
      description
      dueDate
      tomatoes
      priority
      createdAt
      updatedAt
      completed
      timeSpent
    }
  }
`;

export const DASHBOARD_DATA = gql`
  query {
    dashboardData {
      remainingTasks {
        id
        title
        description
        dueDate
        tomatoes
        priority
        createdAt
        updatedAt
        completed
        timeSpent
      }
      timeSpentToday
      timeSpentPastDays
      tasksPerPriority {
        priority
        count
      }
      timeSpentPerTask {
        id
        title
        timeSpent
      }
      avgTimeSpentPerTask
    }
    leaderboardData {
      name
      totalTimeSpent
    }
  }
`;
