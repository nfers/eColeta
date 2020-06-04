import express, { response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import  Users from './users';
import routes from './routes/index';

const app = express();

app.use(bodyParser());

app.use(express.json());

app.use(cors());

const users = 
[
  'Nayara',
  'Mariana',
  'Luna',
  'Beatriz'
];

app.get('/users', (req, res) => {

  // const search = String(req.query.search);
  // const filterusers = search ? users.filter(user => user.includes((search))) : users; 

  res.status(200).send({
    result: 'Ok', data: [users]
  })
});

app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);

  const user = users[id];

  res.status(200).send({
    result: 'Ok', data: [Users]
  })
});

app.post('/users', (req, res) => {
  const data = req.body;

  console.log(data)

  const useris = {
    name: data.name,
    email: data.email

  }

  console.log(useris)

  
  return res.status(200).send({
    result: 'Ok', data: [useris]
  });
});

app.use(routes);

app.listen(3030);

