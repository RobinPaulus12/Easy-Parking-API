import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';
import {sign} from '../util/jwt.js';
import {readPerson} from '../model/person.js';
import argon2 from "argon2";

export const registration = async (req, res) => {
    try {
        const exist = await userModel.userExists(pool, req.val.username);
        if(exist){
            res.status(409).send('Username already used');
        } else {
            await userModel.createUser(pool, req.val);
            res.sendStatus(201);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const login = async (req, res) => {
    try {
        const rep = await readPerson(pool, req.val);
        if(rep.id) {
            const jwt = sign(rep, {
                expiresIn: '8h'
            });
            res.status(201).json({ token: jwt });
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};


export const getUserInfo = async (req, res) => {
    const {id} = req.session;
    try {
        const info = await userModel.getUserByID(pool, id);
        res.send(info);
    } catch (e) {
        res.sendStatus(500);
    }
};

export const getAllUsers = async (req, res) => {
    try {
         
        const page = parseInt(req.params.pagenb) || 1;
        const search = req.query.search || '';
        const limit = 10;
        const offset = (page - 1) * limit;
        const users = await userModel.getAllUsers(pool, limit, offset,search);
        const totalCount = await userModel.countAllUsers(pool, search);

        res.send({
            rows: users.rows,
            total: totalCount.rows[0].count,
          });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    
};

export const updateUser= async (req, res) => {
    try {
        await userModel.updateUser(pool, req.session.id, req.val);
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};
export const updateUserByAdmin = async (req, res) => {
    try {
        await userModel.updateUserByAdmin(pool, req.body.user_id, req.val);
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params; // Assurez-vous d'utiliser req.params pour user_id
        await userModel.deleteUser(pool, { user_id }); // Passez l'objet avec user_id
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

