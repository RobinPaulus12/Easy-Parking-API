import {pool} from '../database/database.js';
import * as carModel from '../model/car.js';
import {createUser} from '../model/user.js';
import {createCar} from '../model/car.js';

/**
 * @swagger
 * components:
 *  schemas:
 *      Car:
 *          type: object
 *          properties:
 *              car_id:
 *                  type: integer
 *              license_plate:
 *                  type: string
 *              model:
 *                  type: string
 *              fk_user:
 *                  type: integer
 */
/**
 * @swagger
 * components:
 *  responses:
 *      getCarInfo:
 *          description: the car
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Car'
 */
export const getCarInfo = async (req, res)=> {
    const {id} = req.session;
        try {
            const info = await carModel.getCarsByUserID(pool, id);
            res.send(info);
        } catch (e) {
            res.sendStatus(500);
        }
};

/**
 * @swagger
 * components:
 *  responses:
 *      getAllCarsByUser:
 *          description: list of all the cars for a user
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Car'
 */
export const getAllCarsByUser = async (req, res) => {
    const { id: user_id } = req.session;
    try {
        const cars = await carModel.getCarsByUserID(pool, user_id);
        res.status(200).json(cars); // Renvoie un tableau de voitures
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
export const addCar = async (req, res) => {
    try {
        const car_id = await carModel.createCar(pool, req.val);
        res.status(201).json({car_id});
    } catch (err) {
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * components:
 *  responses:
 *      carUpdated:
 *          description:car details updated successfully
 *      UpdateCarError:
 *          description: Error occurred while updating car details
 */
export const updateCar = async (req, res) => {
    const { id: user_id } = req.session; // Supposons que l'ID de l'utilisateur connecté est dans req.session.id
    try {
        const { license_plate, model, fk_user, car_id } = req.body;
        
        // Vérifiez d'abord si la voiture appartient à l'utilisateur connecté
        const car = await carModel.getCarByID(pool, car_id);
        if (!car) {
            return res.status(404).send('Car not found');
        }
        
        if (car.fk_user !== user_id) {
            // Si l'utilisateur n'est pas le propriétaire et n'a pas d'autres permissions (comme être administrateur)
            return res.status(403).send('Forbidden: You are not allowed to update this car');
        }

        await carModel.updateCar(pool, { license_plate, model, fk_user, car_id });
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * components:
 *  responses:
 *      CarDeleted:
 *          description: Car deleted successfully
 *      DeleteCarError:
 *          description: Error occurred while deleting car
 */
export const deleteCar = async (req, res) => {
    const { id: user_id } = req.session; // Supposons que l'ID de l'utilisateur connecté est dans req.session.id
    try {
        const { car_id } = req.val;
        
        // Vérifiez si la voiture existe et appartient à l'utilisateur connecté
        const car = await carModel.getCarByID(pool, car_id);
        if (!car) {
            return res.status(404).send('Car not found');
        }
        
        if (car.fk_user !== user_id && !req.session.isAdmin) {
            // Si l'utilisateur n'est pas le propriétaire et n'est pas administrateur
            return res.status(403).send('Forbidden: You are not allowed to delete this car');
        }

        await carModel.deleteCar(pool, { car_id });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * components:
 *  responses:
 *      getAllCars:
 *          description: list of all the cars
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Car'
 */
export const getAllCars = async (req, res) => {
    try {
        const cars = await carModel.getAllCars(pool);
        res.send(cars.rows); 
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * components:
 *  responses:
 *      purchaseWithRegistration:
 *          description: The car and the user are saved
 */
export const carWithRegistration = async (req, res) => {
    let SQLClient;
    try {
        SQLClient = await pool.connect();
        await SQLClient.query('BEGIN');
        const {user_id : user_id} = await createUser(SQLClient, req.val.user);
        await createCar(SQLClient, {...req.val.car, fk_user: user_id});
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