import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bcryptjs from 'bcryptjs';
import Users from './users/users-model';

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

const restricted = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.headers;

  if (username && password) {
    try {
      console.log(username);
      const user = await Users.findBy({ username });

      if (user && bcryptjs.compareSync(password as string, user.password)) {
        next();
      } else {
        res.status(401).json({ error: 'Invalid credentials.' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Unexpected server error.' });
    }
  } else {
    res.status(400).json({ error: 'No credentials provided.' });
  }
};

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.post('/api/register', async (req, res) => {
  const user = req.body;

  const hash = bcryptjs.hashSync(user.password);
  user.password = hash;

  try {
    const saved = await Users.add(user);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findBy({ username });

    if (user && bcryptjs.compareSync(password, user.password)) {
      res.status(200).json({ message: `Welcome ${user.username}!` });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error.' });
  }
});

server.get('/api/users', restricted, async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error.' });
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
