import vine from '@vinejs/vine';

/**
 * @swagger
 * components:
 *  schemas:
 *      localityIDSchema:
 *          type: object
 *          properties:
 *              locality_id:
 *                  type: integer
 *          required:
 *              - locality_id
 */
const localityIDSchema = vine.object({
    locality_id: vine.number()
});

/**
 * @swagger
 * components:
 *  schemas:
 *      localityToAdd:
 *          type: object
 *          properties:
 *              city:
 *                  type: string
 *              country:
 *                  type: string
 *              postal_code:
 *                  type: string
 *              street_name:
 *                  type: string
 *          required:
 *              - city
 *              - country
 *              - postal_code
 *              - street_name
 */
const localityToAddSchema = vine.object({
    city: vine.string().trim(),
    country: vine.string().trim(),
    postal_code: vine.string().trim(),
    street_name: vine.string().trim()
});

/**
 * @swagger:
 * components:
 *  schemas:
 *      localityToUpdate:
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
 *          required:
 *              - locality_id
 */
const localityToUpdateSchema = vine.object({
    locality_id: vine.number(),
    city: vine.string().trim().optional(),
    country: vine.string().trim().optional(),
    postal_code: vine.string().trim().optional(),
    street_name: vine.string().trim().optional()
});


export const
    searchedLocality = vine.compile(localityIDSchema),
    localityToAdd = vine.compile(localityToAddSchema),
    localityToUpdate = vine.compile(localityToUpdateSchema),
    localityToDelete = vine.compile(localityIDSchema);

