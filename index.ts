import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bcryptjs from 'bcryptjs';
import session from 'express-session';
import connect from 'connect-session-knex';
import db from './database/db-config';
import Users from './users/users-model';
import RestrictedRouter from './restrictedRouter';

const server = express();
const KnexSessionStore = connect(session);
const sessionConfig = {
  name: 'oreos',
  secret:
    process.env.SESSION_SECRET ||
    'it means no worries, for the rest of your days',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: db,
    tablename: 'knexsessions',
    sidfieldname: 'sessionid',
    createtable: true,
    clearInterval: 1000 * 60 * 30,
  }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

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
      if (req.session) {
        req.session.user = user;
      }
      res.status(200).json({ message: `Welcome ${user.username}!` });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error.' });
  }
});

server.get('/api/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ error: 'You can never leave.' });
      } else {
        res.status(200).json({ message: 'Bye!' });
      }
    });
  } else {
    res.status(200).json({ message: 'Already gone.' });
  }
});

server.use('/api/restricted', RestrictedRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
