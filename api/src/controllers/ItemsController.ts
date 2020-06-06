import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController{
  async index (req: Request, res: Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
      return {
        id: item.id, 
        title: item.title,
        image_url: `http://localhost:3030/api/uploads/${item.image}`
      }
    })
    
    return res.status(200).send({
      result: true, data: [serializedItems]
    });
  }
}

export default ItemsController;
