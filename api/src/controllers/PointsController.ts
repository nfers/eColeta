import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

  async create(req: Request, res: Response) {
    const {
      name, 
      email, 
      whatsapp, 
      latitude, 
      longitude, 
      city, 
      uf, 
      items
    } = req.body;
  
    const trx = await knex.transaction();
  
    const insertedIds = await trx('points').insert({
      image: 'null',
      name, 
      email, 
      whatsapp, 
      latitude, 
      longitude, 
      city, 
      uf
    });
  
    const point_id = insertedIds[0]
  
    const pointItems = items.map((item_id: number) => {
      return {
        item_id, 
        point_id: point_id
      };
    });
  
    await trx('point_items').insert(pointItems);
   
    return res.status(200).send({
      result: true, data: [items]
    });
  };
}

export default PointsController;