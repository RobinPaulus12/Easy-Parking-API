import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';
import {sign} from '../util/jwt.js';
import {readPerson} from '../model/person.js';

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
            res.status(201).send(jwt);
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
        const users = await userModel.getAllUsers(pool);
        res.send(users.rows); 
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const updateUser = async (req, res) => {
    try {
        await userModel.updateUser(pool, req.session.id, req.val);
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};