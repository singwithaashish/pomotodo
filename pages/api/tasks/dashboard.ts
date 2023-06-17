import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";

const prisma = new PrismaClient();

type UserWithTime = {
  id: string;
  name: string | null;
  totalTimeSpent: number;
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession(req, res);
  const userId = session?.user.sub;

  if (req.method === "GET") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const usersRanked: UserWithTime[] = await prisma.$queryRaw`
      SELECT "User"."id", "User"."name", SUM("Task"."timeSpent") as "totalTimeSpent"
      FROM "Task"
      JOIN "User" ON "Task"."userId" = "User"."id"
      WHERE "Task"."updatedAt" >= ${today}
      GROUP BY "User"."id"
      ORDER BY "totalTimeSpent" DESC;
    `;

    // Converting BigInt to Number before sending response
    const usersRankedWithTimeSpentAsNumber = usersRanked.map((user) => ({
      ...user,
      totalTimeSpent: Number(user.totalTimeSpent),
    }));

    res.json(usersRankedWithTimeSpentAsNumber);
  }
  //   else if (req.method === "POST") {
  //     const task = req.body;
  //     const result = await prisma.task.create({
  //       data: {
  //         ...task,
  //         userId: userId.toString(),
  //       },
  //     });
  //     res.json(result);
  //   }
  else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
