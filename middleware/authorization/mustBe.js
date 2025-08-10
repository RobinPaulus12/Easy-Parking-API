/**
 * @swagger
 * components:
 *  responses:
 *      mustBeAdmin:
 *          description: the action must be realized by an admin
 */

export const admin = (req, res, next) => {
    if(req.session.status === 'admin'){
        next();
    } else {
        res.sendStatus(403);
    }
};