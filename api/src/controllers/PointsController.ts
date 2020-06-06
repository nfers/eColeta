import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items).split(',').map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');


    return res.status(200).send({
      result: true, data: [points]
    })
  }


  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return res.status(400).json({
        message: 'Sorry, Point not Found.'
      });
    };

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id);

    return res.status(200).send({
      result: true, data: [{point, items}]
    })
  }

  async create(req: Request, res: Response) {
    const {
      image,
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

    const point = {
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }

    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0]

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id: point_id
      };
    });

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return res.status(200).send({
      result: true, data: [{ id: point_id, ...point }]
    });
  };

  async getAll(req: Request, res: Response) {
    const points = await knex('points').select('*');

    return res.status(200).send({
      result: true, data: [points]
    })
  }
}

export default PointsController;