import vine from '@vinejs/vine';

/**
 * @swagger
 * components:
 *  schemas:
 *      PlaceIDSchema:
 *          type: object
 *          properties:
 *              place_id:
 *                  type: integer
 *          required:
 *              - place_id
 */
const placeIDSchema = vine.object({
    place_id: vine.number()
});

/**
 * @swagger
 * components:
 *  schemas:
 *      placeToAdd:
 *          type: object
 *          properties:
 *              arrival_time:
 *                  type: string
 *              departure_time:
 *                  type: string
 *              fk_parking:
 *                  type: integer
 *          required:
 *              - arrival_time
 *              - departure_time
 *              - fk_parking
 */
const placeToAddSchema = vine.object({
    arrival_time: vine.date(),
    departure_time: vine.date(),
    fk_parking: vine.number()
});

/**
 * @swagger:
 * components:
 *  schemas:
 *      placeToUpdate:
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
 *          required:
 *              - place_id
 */
const placeToUpdateSchema = vine.object({
    place_id: vine.number(),
    arrival_time: vine.date().transform((value) => new Date(value)),
    departure_time: vine.date().transform((value) => new Date(value)),
    fk_parking: vine.number().optional()
});

/**
 * @swagger
 * components:
 *    schemas:
 *      placeWithParking:
 *          type: object
 *          properties:
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
 *              place:
 *                  type: object
 *                  properties:
 *                      arrival_time:
 *                          type: string
 *                      departure_time:
 *                          type: string
 *                      fk_parking:
 *                          type: integer
 *                  required:
 *                      - arrival_time
 *                      - departure_time
 *          required:
 *              - parking
 *              - place
 */
const placeWithParkingSchema = vine.object({
    parking: vine.object({
        name: vine.string().trim(),
        coordinates: vine.string().trim(),
        places: vine.number(),
        telephone: vine.string().trim(),
        opening: vine.string(), 
        place_width: vine.number(),
        fk_locality: vine.number().optional()
    }),
    place: vine.object({
        arrival_time: vine.date(),
        departure_time: vine.date(),
        fk_parking: vine.number().optional()
    }),
});

export const
    searchedPlace = vine.compile(placeIDSchema),
    placeToAdd = vine.compile(placeToAddSchema),
    placeToUpdate = vine.compile(placeToUpdateSchema),
    placeToDelete = vine.compile(placeIDSchema),
    placeWithParking = vine.compile(placeWithParkingSchema);

