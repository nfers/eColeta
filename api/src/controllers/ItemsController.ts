import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController{
  async getAll (req: Request, res: Response) {
    const items = await knex('items').select('*');
    
    return res.status(200).send({
      result: true, data: [items]
    });
  }
}

export default ItemsController;
