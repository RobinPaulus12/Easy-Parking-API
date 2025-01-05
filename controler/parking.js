import {pool} from '../database/database.js';
import * as parkingModel from '../model/parking.js';
import {createLocality} from '../model/locality.js';
import {createParking} from '../model/parking.js';

/**
 * @swagger
 * components:
 *  schemas:
 *      Parking:
 *          type: object
 *          properties:
 *              parking_id:
 *                  type: integer
 *              name:
 *                  type: string
 *              coordinates:
 *                  type: string
 *              places:
 *                  type: integer
 *              telephone:
 *                  type: string
 *              opening:
 *                  type: string
 *              place_width:
 *                  type: number
 *              fk_locality:
 *                  type: integer
 */
/**
 * @swagger
 * components:
 *  responses:
 *      getParking:
 *          description: the parking
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Parking'
 */
export const getParking = async (req, res)=> {
    try {
        const parking = await parkingModel.readParking(pool, req.val);
        if (parking) {
            res.json(parking);
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
 *      Parkings:
 *          description: Returns a list of all parkings
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Parking'
 */
export const getAllParkings = async (req, res) => {
    try {
        const parkings = await parkingModel.getAllParkings(pool);
        res.send(parkings.rows); 
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};
/**
 * @swagger
 * components:
 *  responses:
 *      ParkingAdded:
 *          description: the parking
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          parking_id:
 *                              type: integer
 */
export const addParking = async (req, res) => {
    try {
        const parking_id = await parkingModel.createParking(pool, req.val);
        res.status(201).json(parking_id);
    } catch (err) {
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * components:
 *  responses:
 *      ParkingUpdated:
 *          description: Parking details updated successfully
 *      UpdateParkingError:
 *          description: Error occurred while updating parking details
 */
export const updateParking = async (req, res) => {
    try {
        await parkingModel.updateParking(pool, req.val);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * components:
 *  responses:
 *      ParkingDeleted:
 *          description: Parking deleted successfully
 *      DeleteParkingError:
 *          description: Error occurred while deleting parking
 */
export const deleteParking = async (req, res) => {
    try {
        await parkingModel.deleteParking(pool, req.val);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * components:
 *  responses:
 *      parkingWithLocality:
 *          description: The parking and the locality are saved
 */
export const parkingWithLocality = async (req, res) => {
    let SQLClient;
    try {
        SQLClient = await pool.connect();
        await SQLClient.query('BEGIN');
        const { locality_id : locality_id } = await createLocality(SQLClient, req.val.locality);
        await createParking(SQLClient, {...req.val.parking, fk_locality: locality_id});
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