import Router from 'express-promise-router';

import {
    addParking,
    updateParking,
    getParking, 
    deleteParking,
    parkingWithLocality,
    getAllParkings,
    getAllParkingsPagination
} from '../controler/parking.js';
//import {authBasic} from '../middleware/identification/basic.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import {manager} from '../middleware/authorization/mustBe.js';
import {parkingValidatorMiddlewares as PVM} from '../middleware/validation.js';
;

/*
import {
    addProduct,
    updateProduct,
    getProduct, deleteProduct
} from "../controler/productORM.js";
*/

const router = Router();

router.get("/all/:pagenb", checkJWT, manager, getAllParkingsPagination);

/**
 * @swagger
 * /parking:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Parking
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ParkingToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/ParkingAdded'
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          500:
 *              description: Error server
 */
router.post('/', checkJWT, manager, PVM.parkingToAdd, addParking);
/**
 * @swagger
 * /parking:
 *  patch:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Parking
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ParkingToUpdate'
 *      responses:
 *          204:
 *              description: parking updated
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.patch('/', checkJWT, manager, PVM.parkingToUpdate, updateParking);

/**
 * @swagger
 * /parking/all:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Parking
 *      summary: Get all parkings
 *      responses:
 *          200:
 *              description: Returns a list of all parkings
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Parking'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          500:
 *              description: Server error
 */
router.get('/all', checkJWT, manager, getAllParkings);

/**
 * @swagger
 * /parking/{parking_id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Parking
 *      parameters:
 *         - in: path
 *           name: parking_id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the parking to get
 *      responses:
 *          200:
 *              $ref: '#/components/schemas/Parking'
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          404:
 *              description: parking not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.get('/:parking_id', PVM.searchedParking, getParking);

/**
 * @swagger
 * /parking/{parking_id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Parking
 *      parameters:
 *         - in: path
 *           name: parking_id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the parking to delete
 *      responses:
 *          204:
 *              description: parking deleted
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              description: Error server
 */
router.delete('/:parking_id', checkJWT, manager, PVM.parkingToDelete, deleteParking);

/**
 * @swagger
 * /parking/withLocality:
 *  post:
 *      security:
 *         - bearerAuth: []
 *      tags:
 *          - Parking
 *      summary: Create parking with locality
 *      requestBody:
 *          description: Object containing parking and locality details
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          locality:
 *                              $ref: '#/components/schemas/Locality'
 *                          parking:
 *                              $ref: '#/components/schemas/ParkingToAdd'
 *                      required:
 *                          - locality
 *                          - parking
 *      responses:
 *          201:
 *              description: Parking and locality successfully created
 *          400:
 *              description: Validation error
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          500:
 *              description: Server error
 */
router.post('/withLocality', checkJWT, manager, PVM.parkingWithLocality, parkingWithLocality);


export default router;