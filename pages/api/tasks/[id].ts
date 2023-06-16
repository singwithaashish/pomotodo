import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  const userId = session?.user.sub;
  const { id } = req.query;

  try{
    console.log(req.body);

  if (req.method === 'PUT') {
    const task = req.body;
    const result = await prisma.task.update({
      where: {
        id: Number(id)
      },
      data: {
        ...task,
        updatedAt: new Date(), // For some reason, Prisma doesn't update this field automatically
        userId: userId,
      },
    });
    res.json(result);
  } else if (req.method === 'DELETE') {
    const result = await prisma.task.delete({
      where: {
        id: Number(id)
      }
    });
    res.json(result);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }

  } catch (e: Error | any) {
    res.status(500).json({ error: e.message });
  }
}

