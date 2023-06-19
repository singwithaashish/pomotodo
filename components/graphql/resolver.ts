import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../../lib/prisma";

export const resolvers = {
  Query: {
    tasks: async (_:any, args: any, context:any) => {
      const session = await getSession(context.req, context.res);
      const userId = session?.user.sub;
      console.log(userId);
      return prisma.task.findMany(
        {
          where: {
            userId: userId,
          },
        },
      );
    },
    // get one task by id
    task: async (_: any, args: any) => {
      return await prisma.task.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    dashboardData: async (_: any, args: any, context: any) => {
      const session = await getSession(context.req, context.res);
      const userId = session?.user.sub;
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
          console.log(task); // to check each task
          if (typeof task.priority !== "string") {
            console.error("Unexpected task priority: ", task.priority);
            return acc;
          }
          acc[task.priority] = (acc[task.priority] || 0) + 1;
          return acc;
        },
        {}
      );

      // Transform the object into an array of objects
      const tasksPerPriorityArray = Object.keys(tasksPerPriority).map(
        (priority) => ({
          priority: priority,
          count: tasksPerPriority[priority],
        })
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
        tasksPerPriority: tasksPerPriorityArray,
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
        `SELECT date("updatedAt") as day, CAST(sum("timeSpent") as INTEGER) as total_time_spent
           FROM "Task"
           WHERE "userId" = $1 AND extract(month from "updatedAt") = $2 AND extract(year from "updatedAt") = $3
           GROUP BY day
           ORDER BY day`,
        userId,
        currentMonth + 1,
        currentYear
      );

      return result;
    },
    leaderboardData: async (_: any, __: any, context: any) => {

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      type UserWithTime = {
        id: string;
        name: string | null;
        totalTimeSpent: number;
      };
      

      const usersRanked: UserWithTime[] = await prisma.$queryRaw`
        SELECT "User"."id", "User"."name", SUM("Task"."timeSpent") as "totalTimeSpent"
        FROM "Task"
        JOIN "User" ON "Task"."userId" = "User"."id"
        WHERE "Task"."updatedAt" >= ${today}
        GROUP BY "User"."id"
        ORDER BY "totalTimeSpent" DESC;
      `;

      // Converting BigInt to Number before returning
      const usersRankedWithTimeSpentAsNumber = usersRanked.map((user) => ({
        ...user,
        totalTimeSpent: Number(user.totalTimeSpent),
      }));

      return usersRankedWithTimeSpentAsNumber;
    },
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
    updateTask: async (_: any, args: any, context: any, info: any) => {
      const { id, title, description, dueDate, priority, tomatoes } = args;
      const task = await prisma.task.update({
        where: { id: id },
        // TODO: also check that the user owns the task
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
    deleteTask: async (
      _: any,
      args: { id: number },
      context: any,
      info: any
    ) => {
      const { id } = args;
      const task = await prisma.task.delete({
        where: { id: id },
      });
      return task;
    },
  },
};
