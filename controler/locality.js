import {pool} from '../database/database.js';
import * as localityModel from '../model/locality.js';


/**
 * @swagger
 * components:
 *  schemas:
 *      Locality:
 *          type: object
 *          properties:
 *              locality_id:
 *                  type: integer
 *              city:
 *                  type: string
 *              country:
 *                  type: string
 *              postal_code:
 *                  type: string
 *              street_name:
 *                  type: string
 */
/**
 * @swagger
 * components:
 *  responses:
 *      getLocality:
 *          description: the locality
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Locality'
 */
export const getLocality = async (req, res)=> {
    try {
        const locality = await localityModel.readLocality(pool, req.val);
        if (locality) {
            res.json(locality);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * components:
 *  responses:
 *      CarAdded:
 *          description: the car
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          car_id:
 *                              type: integer
 */

export const addLocality = async (req, res) => {
    try {
        const locality_id = await localityModel.createLocality(pool, req.val);
        res.status(201).json(locality_id);
    } catch (err) {
        res.sendStatus(500);
    }
};

export const updateLocality = async (req, res) => {
    try {
        await localityModel.updateLocality(pool, req.val);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

export const deleteLocality = async (req, res) => {
    try {
        await localityModel.deleteLocality(pool, req.val);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

export const getAllLocalities = async (req, res) => {
    try {
        const localities = await localityModel.getAllLocalities(pool);
        res.send(localities.rows); 
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};