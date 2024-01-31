import { Router } from 'express';
import { prisma } from '../../prisma';

export const router = Router();

router.post('/', async (req, res) => {
  const { name } = req.body;
  const currentUser = req.session?.currentUser;

  const board = await prisma.board.create({
    data: {
      name,
      profileId: currentUser.profileId
    }
  });

  res.json(board);
});

router.get('/', async (req, res) => {
  const currentUser = req.session?.currentUser;

  // in order to get all boards that is associated with profile
  // then we need profile id

  // we would want to join pins
  const result = await prisma.board.findMany({
    where: { profileId: currentUser.profileId },
    include: {
      pins: true
    }
  });

  res.json(result);
});

// /boards/:id
router.get('/:boardId', async (req, res) => {
  const { boardId } = req.params;
  const currentUser = req.session?.currentUser;

  const result = await prisma.board.findFirst({
    where: {
      AND: [{ profileId: currentUser.profileId }, { id: parseInt(boardId) }]
    },
    include: {
      pins: true
    }
  });

  res.json(result);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, isPublic } = req.body;

  const result = await prisma.board.update({
    where: { id: parseInt(id) },
    data: {
      name,
      isPublic
    }
  });

  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const currentUser = req.session?.currentUser;

  const result = await prisma.board.delete({
    where: { id: parseInt(id), profileId: currentUser.profileId }
  });

  res.json(result);
});
