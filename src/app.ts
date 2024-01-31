import cookieSession from 'cookie-session';
import express, { Request, Response } from 'express';
import { router as authRouter } from './routes/auth.router';
import { router as boardRouter } from './routes/board.router';
import { router as pinsRouter } from './routes/pins.router';
export const app = express();

app.use(
  cookieSession({
    keys: ['secret'],
    maxAge: 1000 * 60 * 60 * 24 // 1day
  })
);
app.use(express.json());

app.use('/auth', authRouter);
app.use('/boards', boardRouter);
app.use('/pins', pinsRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ error: `Not Found Route - ${req.method} ${req.path}` });
});
