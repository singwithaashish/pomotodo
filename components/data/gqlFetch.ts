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
    ) {
        updateTask(
            id: $id
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


