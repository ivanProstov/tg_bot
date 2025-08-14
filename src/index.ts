import express, { Request, Response } from 'express';
import http from 'http';
import { env } from './module/config/env';
import { normalizeError } from './module/utils/normalize-error';

const { PORT, TG_BOT_API_KEY, TG_BOT_CHAT_ID } = env;

const app = express();
const server = http.createServer(app);
app.use(express.json());

app.get('/send', (_req: Request, res: Response) => {
  res.send('Hello World!12');
});

app.post('/send', async (req: Request<{ message: string }>, res: Response) => {
  try {
    if (!TG_BOT_API_KEY || !TG_BOT_CHAT_ID || !req.body.message) {
      throw new Error('Missing data');
    }

    await fetch(`https://api.telegram.org/bot${TG_BOT_API_KEY}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TG_BOT_CHAT_ID,
        text: JSON.stringify(req.body.message, null, 2),
      }),
    });

    res.send(req.body);
  } catch (e: unknown) {
    const error = normalizeError(e);
    res.status(400).send(error.message);
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`WebSocket available at ws://localhost:${PORT}`);
});
