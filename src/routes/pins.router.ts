import { Request, Response, Router } from 'express';
import { prisma } from '../../prisma';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const pins = await prisma.pin.findMany({});

  res.json(pins);
});

router.post(
  '/',
  async (
    req: Request<never, never, { boardId: number; image: string; name: string }>,
    res: Response
  ) => {
    const { name, image, boardId } = req.body;

    const newPin = await prisma.pin.create({
      data: {
        name,
        image,
        boards: {
          create: {
            boardId: boardId
          }
        }
      },
      include: {
        boards: true
      }
    });

    // boards table
    // id 14 name something

    // pins table
    // id 1 name and image

    // board_pins table
    // board_id
    // pin_id auto inserted

    // const bridgeTableData = await prisma.boardPins.create({
    //   data: {
    //     pinId: newPin.id,
    //     boardId: parseInt(boardId)
    //   }
    // });

    res.json(newPin);
  }
);

// /pins/:id
router.patch(
  '/:id',
  async (
    request: Request<{ id: string }, never, { name: string; image: string }>,
    response: Response
  ) => {
    const id = +request.params.id;
    const payload = request.body;
    // const currentUser = request.session?.currentUser;

    //* Check if user exists

    const existingPin = await prisma.pin.findUnique({
      where: { id }
    });

    if (!existingPin) {
      response.status(404).json({ error: 'not found' });
      return;
    }

    // pins has createBy field and compare with current suers profileId

    // if it matches then good to continue
    // otherwise send response back with proper
    // status code and messages

    const updatedPin = await prisma.pin.update({
      data: {
        name: payload.name || existingPin.name,
        image: payload.image || existingPin.image
      },
      where: {
        id
      }
    });

    response.json(updatedPin);
  }
);

router.delete('/:id', async (req, res) => {
  const id = +req.params.id;

  const deleted = await prisma.pin.delete({
    where: { id }
  });

  res.json(deleted);
});
