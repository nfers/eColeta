import { Router } from 'express';
import multer from 'multer';
import MulterConfig from '../config/multer';

/* Rotas */
import PointsController from './../controllers/PointsController';
import ItemsController from './../controllers/ItemsController';
import Points_ItemsController from './../controllers/Points_ItemsController';

const routes = Router();
const upload = multer(MulterConfig);

const points = new PointsController();
const items = new ItemsController();
const pointsItems = new Points_ItemsController();

routes.post('/api/points', upload.single('image'), points.create);

routes.get('/api/points/all', points.getAll); 
routes.get('/api/points/:id', points.show);//example http://localhost:3030/api/points/1
routes.get('/api/points', points.index);

routes.get('/api/items', items.index);

routes.get('/api/points_items', pointsItems.index);
export default routes;