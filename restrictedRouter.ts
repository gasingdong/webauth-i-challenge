import express, { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import Users from './users/users-model';

const router = express.Router();

router.use(express.json());

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

router.use(restricted);

router.get('/users', async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error.' });
  }
});

export default router;
