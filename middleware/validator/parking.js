import vine from '@vinejs/vine';

/**
 * @swagger
 * components:
 *  schemas:
 *      ParkingIDSchema:
 *          type: object
 *          properties:
 *              parking_id:
 *                  type: integer
 *          required:
 *              - parking_id
 */
const parkingIDSchema = vine.object({
    parking_id: vine.number()
});

/**
 * @swagger
 * components:
 *  schemas:
 *      parkingToAdd:
 *          type: object
 *          properties:
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
 *          required:
 *              - name
 *              - coordinates
 *              - places
 *              - telephone
 *              - opening
 *              - place_width
 */
const parkingToAddSchema = vine.object({
    name: vine.string().trim(),
    coordinates: vine.string().trim(),
    places: vine.number(),
    telephone: vine.string().trim(),
    opening: vine.string(),
    place_width: vine.number(),
    fk_locality: vine.number().optional()
});

/**
 * @swagger:
 * components:
 *  schemas:
 *      parkingToUpdate:
 *          type: object
 *          properties:
 *              parking_id:
 *                  type: integer
 *              name:
 *                  type: string
 *              coordinates:
 *                  type: string
 *              places:
 *                  type: number
 *              telephone:
 *                  type: string
 *              opening:
 *                  type: string
 *              place_width:
 *                  type: number
 *          required:
 *              - parking_id
 */
const parkingToUpdateSchema = vine.object({
    parking_id: vine.number(),
    name: vine.string().trim().optional(),
    coordinates: vine.string().trim().optional(),
    places: vine.number().optional(),
    telephone: vine.string().trim().optional(),
    opening: vine.string().optional(),
    place_width: vine.number().optional(),
    fk_locality: vine.number().optional()
});

/**
 * @swagger
 * components:
 *    schemas:
 *      parkingWithLocality:
 *          type: object
 *          properties:
 *              locality:
 *                  type: object
 *                  properties:
 *                      city:
 *                          type: string
 *                      country:
 *                          type: string
 *                      postal_code:
 *                          type: string
 *                      street_name:
 *                          type: string
 *                  required:
 *                      - city
 *                      - country
 *                      - postal_code
 *                      - street_name
 *              parking:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      coordinates:
 *                          type: string
 *                      places:
 *                          type: number
 *                      telephone:
 *                          type: string
 *                      opening:
 *                          type: string
 *                      place_width:
 *                          type: number
 *                      fk_locality: 
 *                          type: integer
 *                  required:
 *                      - name
 *                      - coordinates
 *                      - places
 *                      - telephone
 *                      - opening
 *                      - place_width
 *          required:
 *              - locality
 *              - parking
 */
const parkingWithLocalitySchema = vine.object({
    locality: vine.object({
        city: vine.string().trim(),
        country: vine.string().trim(),
        postal_code: vine.string().trim(),
        street_name: vine.string().trim(),
    }),
    parking: vine.object({
        name: vine.string().trim(),
        coordinates: vine.string().trim(),
        places: vine.number(),
        telephone: vine.string().trim(),
        opening: vine.string(), 
        place_width: vine.number(),
        fk_locality: vine.number().optional()
    })
});

export const
    searchedParking = vine.compile(parkingIDSchema),
    parkingToAdd = vine.compile(parkingToAddSchema),
    parkingToUpdate = vine.compile(parkingToUpdateSchema),
    parkingToDelete = vine.compile(parkingIDSchema),
    parkingWithLocality = vine.compile(parkingWithLocalitySchema);

