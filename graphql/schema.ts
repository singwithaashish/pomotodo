export const typeDefs = /* GraphQL */ `
  scalar DateTime
  type customField {
    name: String!
    value: String!
  }
  type Task {
    updatedAt: DateTime!
    id: Int
    title: String
    completed: Boolean
    description: String
    dueDate: DateTime
    tomatoes: Int
    priority: String
    timeSpent: Int
    createdAt: DateTime!
    userId: String!
    customField: customField!
  }

  type TaskPriorityCount {
    priority: String!
    count: Int!
  }

  type TaskTimeSpent {
    id: Int!
    title: String!
    timeSpent: Int!
  }

  type DashboardData {
    remainingTasks: [Task!]!
    timeSpentToday: Int!
    timeSpentPastDays: Int!
    tasksPerPriority: [TaskPriorityCount!]!
    timeSpentPerTask: [TaskTimeSpent!]!
    avgTimeSpentPerTask: Float!
  }

  

  type DayData {
    day: DateTime!
    total_time_spent: Int!
  }

  type UserWithTime {
    id: String!
    name: String!
    totalTimeSpent: Int!
  }

  type Query {
    tasks: [Task!]!
    task(id: Int!): Task
    dashboardData: DashboardData!
    dashboardDataByDay: [DayData!]!
    leaderboardData: [UserWithTime!]!
  }
  type Mutation {
    createTask(
      title: String!
      description: String!
      dueDate: DateTime!
      priority: String!
      tomatoes: Int!
      customFieldName: String
      customFieldValue: String
    ): Task!
    updateTask(
      id: Int!
      title: String
      description: String
      dueDate: DateTime
      priority: String
      tomatoes: Int
      completed: Boolean
      timeSpent: Int
      customFieldName: String
      customFieldValue: String
    ): Task!
    deleteTask(id: Int!): Task!
    addCustomFieldToTask(id: Int!, name: String!, value: String!): Task!
  }
`;
