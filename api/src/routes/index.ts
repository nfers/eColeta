import { Router } from 'express';
import knex from '../database/connection';


const routes = Router();

routes.get('/api/items', async (req, res) => {

  const items = await knex('items').select('*');

  const serializedItems = items.map(item => {
    return {
      title: item.title,
      image_url: `http://localhost:3030/api/uploads/${item.image}`,
    };
  });

  return res.status(200).send({
    result: true, data: [serializedItems]
  })
});

routes.get('/api/users', (req, res) => {

  res.status(200).send({
    result: 'Ok', data: ['']
  })
});


routes.get('api/users', (req, res) => {

  // const search = String(req.query.search);
  // const filterusers = search ? users.filter(user => user.includes((search))) : users; 

  res.status(200).send({
    result: 'Ok', data: ['']
  })
});

routes.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);

  //const user = users[id];

  res.status(200).send({
    result: 'Ok', data: ['user']
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