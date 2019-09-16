import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.post('/api/register', (req, res) => {});

server.post('/api/login', (req, res) => {});

server.get('/api/users', (req, res) => {});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
