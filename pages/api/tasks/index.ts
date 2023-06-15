import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  const userId = session?.user.sub;

  if (req.method === 'GET') {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId
      }
    });
    res.json(tasks);
  } else if (req.method === 'POST') {
    const task = req.body;
    const result = await prisma.task.create({
      data: {
        ...task,
        userId: userId,
      },
    });
    res.json(result);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
