import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../../lib/prisma";

export const resolvers = {
  Query: {
    tasks: () => {
      return prisma.task.findMany();
    },
    dashboardData: async (_: any, args: any, context: any) => {
      const session = await getSession(context.req, context.res);
      const userId = "auth0|6489bc53e2873008daf4716c"//session?.user.sub;
      const now = new Date();
      const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      // Get all tasks for the user
      const tasks = await prisma.task.findMany({
        where: {
          userId: userId,
        },
      });

      // Get remaining tasks
      const remainingTasks = tasks.filter((task) => !task.completed);

      // Calculate total time spent today
      const timeSpentToday = tasks
        .filter((task) => task.updatedAt >= startOfToday)
        .reduce((acc, task) => acc + task.timeSpent, 0);

      // Calculate total time spent on past days
      const timeSpentPastDays = tasks
        .filter((task) => task.updatedAt < startOfToday)
        .reduce((acc, task) => acc + task.timeSpent, 0);

      // Count number of tasks per priority level
      const tasksPerPriority = tasks.reduce(
        (acc: { [key: string]: number }, task) => {
          acc[task.priority] = (acc[task.priority] || 0) + 1;
          return acc;
        },
        {}
      );

      // Calculate total time spent per task
      const timeSpentPerTask = tasks.map((task) => ({
        id: task.id,
        title: task.title,
        timeSpent: task.timeSpent,
      }));

      // Calculate average time spent per task
      const totalTimeSpent = tasks.reduce(
        (acc, task) => acc + task.timeSpent,
        0
      );
      const avgTimeSpentPerTask = totalTimeSpent / tasks.length;

      return {
        remainingTasks,
        timeSpentToday,
        timeSpentPastDays,
        tasksPerPriority,
        timeSpentPerTask,
        avgTimeSpentPerTask,
      };
    },
    dashboardDataByDay: async (_: any, args: any, context: any) => {
        const session = await getSession(context.req, context.res);
        const userId = session?.user.sub;
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
      
        // SQL Query to get the total time spent for each day of the current month
        const result = await prisma.$queryRawUnsafe(
          `SELECT date(updated_at) as day, sum(time_spent) as total_time_spent
           FROM "task"
           WHERE user_id = $1 AND extract(month from updated_at) = $2 AND extract(year from updated_at) = $3
           GROUP BY day
           ORDER BY day`,
          userId,
          currentMonth + 1, 
          currentYear
        );
      
        return result;
      }
      
  },

  Mutation: {
    createTask: async (_: any, args: any, context: any, info: any) => {
      const { title, description, dueDate, priority, tomatoes } = args;
      const session = await getSession(context.req, context.res);
      const userId = session?.user.sub;
      const task = await prisma.task.create({
        data: {
          title,
          description,
          dueDate,
          priority,
          tomatoes,
          userId: userId, //"auth0|6489bc53e2873008daf4716c"//context.user.sub,
        },
      });
      return task;
    },
    updateTask: async ({
      parent,
      args,
      context,
      info,
    }: {
      parent: any;
      args: {
        id: number;
        title: string;
        description: string;
        dueDate: string;
        priority: string;
        tomatoes: number;
      };
      context: any;
      info: any;
    }) => {
      const { id, title, description, dueDate, priority, tomatoes } = args;
      const task = await prisma.task.update({
        where: { id: id },
        data: {
          title,
          description,
          dueDate,
          priority,
          tomatoes,
        },
      });
      return task;
    },
    deleteTask: async ({
      parent,
      args,
      context,
      info,
    }: {
      parent: any;
      args: {
        id: number;
      };
      context: any;
      info: any;
    }) => {
      const { id } = args;
      const task = await prisma.task.delete({
        where: { id: id },
      });
      return task;
    },
    
  },
};

    
