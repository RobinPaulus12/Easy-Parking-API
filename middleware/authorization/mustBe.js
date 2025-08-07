/**
 * @swagger
 * components:
 *  responses:
 *      mustBeManager:
 *          description: the action must be realized by a manager
 */

export const manager = (req, res, next) => {
    if(req.session.status === 'admin'){
        next();
    } else {
        res.sendStatus(403);
    }
};