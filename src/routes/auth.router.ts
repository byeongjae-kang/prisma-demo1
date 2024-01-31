import { Router } from 'express';
import { prisma } from '../../prisma';

export const router = Router();

router.post('/register', async (req, res) => {
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
    data: { email, password, profile: { create: {} } },
    include: {
      profile: {
        select: {
          id: true
        }
      }
    }
  });

  req.session = {
    currentUser: {
      id: user.id,
      email: user.email,
      profileId: user.profile?.id
    }
  };

  res.status(201).json({ message: 'will send jwt in the future' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const existing = await prisma.account.findUnique({
    where: { email },
    include: {
      profile: {
        select: {
          id: true
        }
      }
    }
  });

  if (!existing) {
    res.status(401).json({ message: 'Unauthorized: invalid email or password ' });
    return;
  }

  const isPasswordMatching = password === existing.password;

  if (!isPasswordMatching) {
    res.status(401).json({ message: 'Unauthorized: invalid email or password ' });
    return;
  }

  req.session = {
    currentUser: {
      id: existing.id,
      email: existing.email,
      profileId: existing.profile?.id
    }
  };

  res.json({ message: 'we are gonna send jwt in the future' });
});
