import {pool} from '../database/database.js';
import {updateUser as updateU} from '../model/manager.js';
import {deleteUser as deleteU} from '../model/manager.js';

export const updateUser = async (req, res) => {
    try {
        await updateU(pool, req.val);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params; // Assurez-vous d'utiliser req.params pour user_id
        await deleteU(pool, { user_id }); // Passez l'objet avec user_id
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};