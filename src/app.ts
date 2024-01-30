import express, { Request, Response } from 'express';
import { prisma } from '../prisma/index';
export const app = express();

app.use(express.json());

app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;

  const existing = await prisma.account.findUnique({
    where: {
      email
    }
  });

  if (existing) {
    res.status(409).json({ message: 'email already exists!!' });
  }

  const user = await prisma.account.create({
    data: { email, password, profile: { create: {} } }
  });

  res.status(201).json(user);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ error: `Not Found Route - ${req.method} ${req.path}` });
});
