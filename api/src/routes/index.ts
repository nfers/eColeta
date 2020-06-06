import { Router } from 'express';
import knex from '../database/connection';

/* Rotas */
import PointsController from './../controllers/PointsController';
import ItemsController from './../controllers/ItemsController';

const routes = Router();

const points = new PointsController();
const items = new ItemsController();

routes.post('/api/points', points.create);
routes.get('/api/points', points.getAll);
routes.get('/api/items', items.getAll);

export default routes;