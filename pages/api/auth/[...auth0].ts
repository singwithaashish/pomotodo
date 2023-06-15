import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { handleAuth, handleCallback, AfterCallback } from '@auth0/nextjs-auth0';
import Session  from '@auth0/nextjs-auth0/dist/session/session';

const prisma = new PrismaClient();

const afterCallback = async (
    req: NextApiRequest,
    res: NextApiResponse,
    session: Session,
    state: Record<string, any> | undefined
  ) => {
    const { user } = session;
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: user.sub },
    });
    // If not, create a new user
    if (!existingUser) {
      await prisma.user.create({
        data: {
          id: user.sub,
          email: user.email,
          name: user.name,
        },
      });
    }
    return session;
  };
  
  export default handleAuth({
    async callback(req, res) {
      try {
        await handleCallback(req, res, { afterCallback });
      } catch (error) {
        res.status((error as any).status || 500).end((error as Error).message);
      }
    },
  });
  
