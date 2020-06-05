import { Router } from 'express';


const routes = Router();


routes.get('/api', (req, res) => {

  res.status(200).send({
    result: true, data: ['API em execução']
  })
});

const users =
  [
    'Nayara',
    'Mariana',
    'Luna',
    'Beatriz'
  ];

routes.get('/api/users', (req, res) => {

  res.status(200).send({
    result: 'Ok', data: [users]
  })
});


routes.get('api/users', (req, res) => {

  // const search = String(req.query.search);
  // const filterusers = search ? users.filter(user => user.includes((search))) : users; 

  res.status(200).send({
    result: 'Ok', data: [users]
  })
});

routes.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);

  const user = users[id];

  res.status(200).send({
    result: 'Ok', data: [user]
  })
});

routes.post('/api/users', (req, res) => {
  const data = req.body;

  const useris = {
    name: data.name,
    email: data.email
  }

  return res.status(200).send({
    result: 'Ok', data: [useris]
  });
});

export default routes;