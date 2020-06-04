import { Router } from 'express';


const routes = Router();

routes.get('/api', (req, res) =>
  res.status(200).send({
    message: 'Ok'
  })
)

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
export default routes;