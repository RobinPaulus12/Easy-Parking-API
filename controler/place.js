import {pool} from '../database/database.js';
import * as placeModel from '../model/place.js';
import {createParking} from '../model/parking.js'
import {createPlace} from '../model/place.js'

/**
 * @swagger
 * components:
 *  schemas:
 *      Place:
 *          type: object
 *          properties:
 *              place_id:
 *                  type: integer
 *              arrival_time:
 *                  type: string
 *              departure_time:
 *                  type: string
 *              fk_parking:
 *                  type: integer
 */

/**
 * @swagger
 * components:
 *  responses:
 *      Places:
 *          description: Returns a list of all places
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Place'
 */
export const getAllPlaces = async (req, res) => {
    try {
        const places = await placeModel.getAllPlaces(pool);
        res.send(places.rows); 
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * components:
 *  responses:
 *      Places:
 *          description: Returns a list of all places with pagination
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Place'
 */
export const getAllPlacesPagination = async (req, res) => {
    try {
        const page = parseInt(req.params.pagenb) || 1;
        const search = req.query.search || '';
        const limit = 10;
        const offset = (page - 1) * limit;

        const places = await placeModel.getAllPlacesPagination(pool,limit,offset,search);

        const totalResult = await pool.query(
            `SELECT COUNT(*) FROM place
            JOIN "parking" ON place.fk_parking = "parking".parking_id
            WHERE "parking".name ILIKE $1`,
            [`%${search}%`]);

        res.send({
            rows: places.rows,
            total: parseInt(totalResult.rows[0].count)
        });

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};


export const getPlacesForParking = async (req, res) => {
    const { parking_id } = req.params;
    try {
        const places = await placeModel.getPlacesByParkingID(pool, parking_id);
        res.status(200).json(places);
    } catch (e) {
        console.error(e);
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
export const addPlace = async (req, res) => {
    try {
        const place_id = await placeModel.createPlace(pool, req.val);
        res.status(201).json({place_id});
    } catch (err) {
        res.sendStatus(500);
    }
};

export const updatePlace = async (req, res) => {
    try {
        await placeModel.updatePlace(pool, req.val);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

export const deletePlace = async (req, res) => {
    try {
        await placeModel.deletePlace(pool, req.val);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * components:
 *  responses:
 *      placeWithParking:
 *          description: The place and the parking are saved
 */
export const placeWithParking = async (req, res) => {
    let SQLClient;
    try {
        SQLClient = await pool.connect();
        await SQLClient.query('BEGIN');
        const {parking_id} = await createParking(SQLClient, req.val.parking);
        await createPlace(SQLClient, {...req.val.place, fk_parking: parking_id});
        await SQLClient.query('COMMIT');
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        try {
            if(SQLClient){
                await SQLClient.query('ROLLBACK');
            }
        } catch (err) {
            console.error(err);
        } finally {
            res.sendStatus(500);
        }
    } finally {
        if(SQLClient){
            SQLClient.release();
        }
    }
};