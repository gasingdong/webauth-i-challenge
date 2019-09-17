import express, { Request, Response, NextFunction } from 'express';
import Users from './users/users-model';

const router = express.Router();

router.use(express.json());

const restricted = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({
      error: 'You must be logged in before you can access this data.',
    });
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
