    import Router from 'express-promise-router';

    import {
        addCar,
        updateCar, 
        deleteCar,
        carWithRegistration,
        getAllCarsByUser,
        getAllCars,
    } from '../controler/car.js';
    //import {authBasic} from '../middleware/identification/basic.js';
    import {checkJWT} from '../middleware/identification/jwt.js';
    import {admin} from '../middleware/authorization/mustBe.js';
    import {carValidatorMiddlewares as CVM} from '../middleware/validation.js';

    const router = Router();

    router.get('/all/:pagenb', checkJWT, admin, getAllCars);

    /**
     * @swagger
     * /car:
     *  post:
     *      security:
     *          - bearerAuth: []
     *      tags:
     *          - Car
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/CarToAdd'
     *      responses:
     *          201:
     *              $ref: '#/components/responses/CarAdded'
     *          400:
     *              description: the error(s) described
     *              content:
     *                  text/plain:
     *                      schema:
     *                          type: string
     *          401:
     *              $ref: '#/components/responses/UnauthorizedError'
     *          403:
     *              $ref: '#/components/responses/mustBeAdmin'
     *          500:
     *              description: Error server
     */
    router.post('/', checkJWT, CVM.carToAdd, addCar);

    /**
     * @swagger
     * /car:
     *  patch:
     *      security:
     *          - bearerAuth: []
     *      tags:
     *          - Car
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/CarToUpdate'
     *      responses:
     *          204:
     *              description: car updated
     *          401:
     *              $ref: '#/components/responses/UnauthorizedError'
     *          403:
     *              $ref: '#/components/responses/mustBeAdmin'
     *          400:
     *              description: the error(s) described
     *              content:
     *                  text/plain:
     *                      schema:
     *                          type: string
     *          500:
     *              description: Error server
     */
    router.patch('/', checkJWT, CVM.update, updateCar);
    /**
     * @swagger
     * /car/all:
     *  get:
     *      security:
     *          - bearerAuth: []
     *      tags:
     *          - Car
     *      summary: Get all cars
     *      responses:
     *          200:
     *              description: List of all cars
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/Car'
     *          401:
     *              $ref: '#/components/responses/UnauthorizedError'
     *          403:
     *              description: Only admins are allowed to access this endpoint
     *          500:
     *              description: Server error
     */
    router.get('/all', checkJWT, admin, getAllCars);

    /**
     * @swagger
     * /car/me:
     *  get:
     *      security:
     *          - bearerAuth: []
     *      tags:
     *          - Car
     *      summary: Get all cars owned by the logged-in user
     *      responses:
     *          200:
     *              description: List of cars owned by the logged-in user
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/Car'
     *          401:
     *              $ref: '#/components/responses/UnauthorizedError'
     *          500:
     *              description: Server error
     */
    router.get('/me',checkJWT, getAllCarsByUser);
    /**
     * @swagger
     * /car/{car_id}:
     *  delete:
     *      security:
     *          - bearerAuth: []
     *      tags:
     *          - Car
     *      parameters:
     *         - in: path
     *           name: car_id
     *           schema:
     *             type: integer
     *           required: true
     *           description: Numeric ID of the car to delete
     *      responses:
     *          204:
     *              description: car deleted
     *          400:
     *              description: the error(s) described
     *              content:
     *                  text/plain:
     *                      schema:
     *                          type: string
     *          403:
     *              $ref: '#/components/responses/mustBeAdmin'
     *          401:
     *              $ref: '#/components/responses/UnauthorizedError'
     *          500:
     *              description: Error server
     */
    router.delete('/:car_id', checkJWT, CVM.carToDelete, deleteCar);

    /**
     * @swagger
     * /car/withRegistration:
     *  post:
     *      security:
     *         - bearerAuth: []
     *      tags:
     *          - Car
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/carWithRegistration'
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
    router.post('/withRegistration', CVM.carWithRegistration, carWithRegistration);

    export default router;