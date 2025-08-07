import vine from '@vinejs/vine';

/**
 * @swagger
 * components:
 *  schemas:
 *      carIDSchema:
 *          type: object
 *          properties:
 *              car_id:
 *                  type: integer
 *          required:
 *              - car_id
 */
const carIDSchema = vine.object({
    car_id: vine.number()
});

/**
 * @swagger
 * components:
 *  schemas:
 *      carToAdd:
 *          type: object
 *          properties:
 *              license_plate:
 *                  type: string
 *              model:
 *                  type: string
 *              fk_user:
 *                  type: integer
 *          required:
 *              - license_plate
 *              - model
 */
const carToAddSchema = vine.object({
    license_plate: vine.string().trim(),
    model: vine.string().trim(),
    fk_user: vine.number().optional()
});

/**
 * @swagger:
 * components:
 *  schemas:
 *      carToUpdate:
 *          type: object
 *          properties:
 *              license_plate:
 *                  type: string
 *              model:
 *                  type: string
 *          required:             
 *              - license_plate
 *              - model
 */
const updateSchema = vine.object({
    car_id: vine.number(),
    license_plate: vine.string().trim().optional(),
    model: vine.string().trim().optional(),
});

/**
 * @swagger
 * components:
 *    schemas:
 *      carWithRegistration:
 *          type: object
 *          properties:
 *              user:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      firstname:
 *                          type: string
 *                      date_of_birth:
 *                          type: string
 *                      username:
 *                          type: string
 *                      password:
 *                          type: string
 *                      avatar:
 *                          type: boolean
 *                  required:
 *                      - name
 *                      - firstname
 *                      - date_of_birth
 *                      - username
 *                      - password
 *              car:
 *                  type: object
 *                  properties:
 *                      license_plate:
 *                          type: string
 *                      model:
 *                          type: string
 *                      fk_user:
 *                          type: integer
 *                  required:
 *                      - license_plate
 *                      - model
 *          required:
 *              - user
 *              - car
 */
const carWithRegistrationSchema = vine.object({
    user: vine.object({
        name: vine.string().trim(),
        firstname: vine.string().trim(),
        date_of_birth: vine.date(),
        username: vine.string().trim(), 
        password: vine.string(),
        isAdmin:vine.boolean()
    }),
    car: vine.object({
        license_plate: vine.string(),
        model: vine.string().trim(),
        fk_user: vine.number().optional()
    }),
});

export const
    carToAdd = vine.compile(carToAddSchema),
    update = vine.compile(updateSchema),
    carToDelete = vine.compile(carIDSchema),
    carWithRegistration = vine.compile(carWithRegistrationSchema);

