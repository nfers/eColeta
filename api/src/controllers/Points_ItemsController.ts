import knex from '../database/connection';
import { Request, Response } from 'express';

class Points_ItemsController {
  async index (req: Request, res: Response) {    
    const pointsItems = await knex('point_items').select('*');

    return res.send({
      sucess: true, data: [pointsItems]
    })
  }
}


export default Points_ItemsController;