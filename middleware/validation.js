import * as userValidator from './validator/user.js';
import * as carValidator from './validator/car.js';
import * as localityValidator from './validator/locality.js';
import * as placeValidator from './validator/place.js';
import * as parkingValidator from './validator/parking.js';



/**
 * @swagger
 * components:
 *  responses:
 *      ValidationError:
 *          description: the error(s) described
 *          content:
 *              text/plain:
 *                  schema:
 *                      type: string
 */
export const userValidatorMiddleware = {
    login: async (req, res, next) => {
        try {
            req.val = await userValidator.login.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    user : async (req, res, next) => {
        try {
            req.val = await userValidator.user.validate(req.body);
            next();
        } catch (e){
            res.status(400).send(e.messages);
        }
    },
    update: async (req, res, next) => {
        try {
            req.val = await userValidator.update.validate(req.body);
            next();
        } catch (e){
            res.status(400).send(e.messages);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            req.val = await userValidator.deleteUser.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    updateSchemaByAdmin: async (req, res, next) => {
        try {
            req.val = await userValidator.updateByAdmin.validate(req.body);
            next();
        } catch (e){
            res.status(400).send(e.messages);
        }
    }, 
};

export const carValidatorMiddlewares = {
    carToAdd: async(req, res, next) => {
        try {
            req.val  = await carValidator.carToAdd.validate(req.body);
            req.val.fk_user = req.session.id;
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    update: async(req, res, next) => {
        try {
            req.val = await carValidator.update.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    carToDelete: async(req, res, next) => {
        try {
            req.val  = await carValidator.carToDelete.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    carWithRegistration : async (req, res, next) => {
        try {
            req.val = await carValidator.carWithRegistration.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};

export const localityValidatorMiddlewares = {
    searchedLocality : async (req, res, next) => {
        try {
            req.val  = await localityValidator.searchedLocality.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    localityToAdd: async(req, res, next) => {
        try {
            req.val  = await localityValidator.localityToAdd.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    localityToUpdate: async(req, res, next) => {
        try {
            req.val  = await localityValidator.localityToUpdate.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    localityToDelete: async(req, res, next) => {
        try {
            req.val  = await localityValidator.localityToDelete.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};

export const placeValidatorMiddlewares = {
    searchedPlace : async (req, res, next) => {
        try {
            req.val  = await placeValidator.searchedPlace.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    placeToAdd: async(req, res, next) => {
        try {
            req.val  = await placeValidator.placeToAdd.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    placeToUpdate: async(req, res, next) => {
        try {
            req.val  = await placeValidator.placeToUpdate.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    placeToDelete: async(req, res, next) => {
        try {
            req.val  = await placeValidator.placeToDelete.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
   placeWithParking : async (req, res, next) => {
        try {
            req.val = await placeValidator.placeWithParking.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};

export const parkingValidatorMiddlewares = {
    searchedParking : async (req, res, next) => {
        try {
            req.val  = await parkingValidator.searchedParking.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    parkingToAdd: async(req, res, next) => {
        try {
            req.val  = await parkingValidator.parkingToAdd.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    parkingToUpdate: async(req, res, next) => {
        try {
            req.val  = await parkingValidator.parkingToUpdate.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    parkingToDelete: async(req, res, next) => {
        try {
            req.val  = await parkingValidator.parkingToDelete.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    parkingWithLocality : async (req, res, next) => {
        try {
            req.val = await parkingValidator.parkingWithLocality.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};
