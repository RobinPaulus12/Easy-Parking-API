import Router from 'express-promise-router';

import {
    addPlace,
    updatePlace,
    getAllPlaces,
    deletePlace,
    placeWithParking, 
    getPlacesForParking
} from '../controler/place.js';
//import {authBasic} from '../middleware/identification/basic.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import {manager} from '../middleware/authorization/mustBe.js';
import {placeValidatorMiddlewares as PVM} from '../middleware/validation.js';

/*
import {
    addProduct,
    updateProduct,
    getProduct, deleteProduct
} from "../controler/productORM.js";
*/

const router = Router();

/**
 * @swagger
 * /place:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Place
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PlaceToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/PlaceAdded'
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
router.post('/', checkJWT, manager, PVM.placeToAdd, addPlace);
/**
 * @swagger
 * /place:
 *  patch:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Place
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PlaceToUpdate'
 *      responses:
 *          204:
 *              description: place updated
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
router.patch('/', checkJWT, manager, PVM.placeToUpdate, updatePlace);

/**
 * @swagger
 * /place/all:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Place
 *      summary: Get all places
 *      responses:
 *          200:
 *              description: Returns a list of all places
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Place'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          500:
 *              description: Server error
 */
router.get('/all', getAllPlaces);
/**
 * @swagger
 * /place/{parking_id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Place
 *      parameters:
 *         - in: path
 *           name: parking_id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the parking to get
 *      responses:
 *          200:
 *              $ref: '#/components/schemas/Place'
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          404:
 *              description: place not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.get('/:parking_id', getPlacesForParking);
/**
 * @swagger
 * /place/{place_id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Place
 *      parameters:
 *         - in: path
 *           name: place_id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the place to delete
 *      responses:
 *          204:
 *              description: place deleted
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
router.delete('/:place_id', checkJWT, manager, PVM.placeToDelete, deletePlace);

/**
 * @swagger
 * /place/withParking:
 *  post:
 *      security:
 *         - bearerAuth: []
 *      tags:
 *          - Place
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/placeWithParking'
 *      responses:
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              description: Server error
 *
 */
router.post('/withParking', checkJWT, manager, PVM.placeWithParking, placeWithParking);
export default router;