import { Router } from 'express';
import knex from '../database/connection';


const routes = Router();

routes.get('/api/items', async (req, res) => {

  const items = await knex('items').select('*');

  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3030/api/uploads/${item.image}`,
    };
  });

  return res.status(200).send({
    result: true, data: [serializedItems]
  });

});

routes.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);

  //const user = users[id];

  res.status(200).send({
    result: 'Ok', data: ['user']
  })
});

routes.post('/api/points', async (req, res) => {
  const {
    name, 
    email, 
    whatsapp, 
    latitude, 
    longitude, 
    city, 
    uf, 
    items
  } = await req.body;

  await knex('points').insert({
    image: 'null',
    name, 
    email, 
    whatsapp, 
    latitude, 
    longitude, 
    city, 
    uf
  });
 
  return res.status(200).send({
    result: true, data: [items]
  });
});

export default routes;