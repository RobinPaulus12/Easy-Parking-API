import Router from 'express-promise-router';

import {
    addLocality,
    updateLocality,
    getLocality, 
    deleteLocality,
    getAllLocalities,
    getAllLocalitiesPagination
} from '../controler/locality.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import {admin} from '../middleware/authorization/mustBe.js';
import {localityValidatorMiddlewares as LVM} from '../middleware/validation.js';


const router = Router();

router.get("/all/:pagenb", checkJWT, admin, getAllLocalitiesPagination);

/**
 * @swagger
 * /locality:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Locality
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LocalityToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/LocalityAdded'
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
router.post('/', checkJWT, admin, LVM.localityToAdd, addLocality);
/**
 * @swagger
 * /locality:
 *  patch:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Locality
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LocalityToUpdate'
 *      responses:
 *          204:
 *              description: locality updated
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
router.patch('/', checkJWT, admin, LVM.localityToUpdate, updateLocality);

/**
 * @swagger
 * /locality/all:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Locality
 *      summary: Get all localities
 *      description: Retrieve a list of all the localities in the system. Requires the user to be authenticated and have admin access.
 *      responses:
 *          200:
 *              description: A list of localities
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Locality'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              description: Only admins are allowed to access this endpoint
 *          500:
 *              description: Error server
 */
router.get('/all', checkJWT, admin, getAllLocalities);

/**
 * @swagger
 * /locality/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Locality
 *      parameters:
 *         - in: path
 *           name: locality_id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the locality to get
 *      responses:
 *          200:
 *              $ref: '#/components/schemas/Locality'
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          404:
 *              description: locality not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.get('/:locality_id', LVM.searchedLocality, getLocality);
/**
 * @swagger
 * /locality/{locality_id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Locality
 *      parameters:
 *         - in: path
 *           name: locality_id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the locality to delete
 *      responses:
 *          204:
 *              description: locality deleted
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
router.delete('/:locality_id', checkJWT, admin, LVM.localityToDelete, deleteLocality);

export default router;