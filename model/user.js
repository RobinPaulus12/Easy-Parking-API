import {hash} from '../util/index.js';


export const userExists = async (SQLClient, {username}) => {
    const {rows} = await SQLClient.query(
        'SELECT COUNT(*) FROM "user" WHERE username = $1',
        [username]
    );
    return rows.count > 0;
};
export const createUser = async (SQLClient, {name, firstname, date_of_birth, username, password, avatar}) => {
    const {rows} = await SQLClient.query(
        'INSERT INTO "user"(name, firstname, date_of_birth, username, password, avatar) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id',
        [
            name,
            firstname,
            date_of_birth,
            username,
            await hash(password),
            avatar
        ]
    );
    return rows[0];
};

export const getAllUsers = async (SQLClient) => {
    return (await SQLClient.query('SELECT * from "user"'));
};

export const readUserByUsername = async (SQLClient, {username}) => {
    let query = 'SELECT * FROM "user" WHERE username = $1';
    const {rows} = await SQLClient.query(query, [username]);
    return rows[0];
};

export const getUserByID = async (clientSQL, user_id) => {
    return (await clientSQL.query('SELECT user_id, name, firstname, date_of_birth, username, avatar FROM "user" WHERE user_id = $1', [user_id])).rows[0];
};

export const deleteUser = async (SQLClient, { user_id }) => {
    const {rows} = await SQLClient.query('DELETE FROM "user" WHERE user_id = $1 RETURNING user_id', [user_id]);
    return rows[0].user_id;
};

export const updateUser = async (SQLClient, user_id, {name, firstname, date_of_birth, username, password, avatar}) => {
    let query = 'UPDATE "user" SET ';
    const querySet = [];
    const queryValues = [];
    if(name){
        queryValues.push(name);
        querySet.push(`name = $${queryValues.length}`);
    }
    if(firstname){
        queryValues.push(firstname);
        querySet.push(`firstname = $${queryValues.length}`);
    }
    if(date_of_birth){
        queryValues.push(date_of_birth);
        querySet.push(`date_of_birth = $${queryValues.length}`);
    }
    if(username){
        queryValues.push(username);
        querySet.push(`username = $${queryValues.length}`);
    }
    if(password){
        queryValues.push(await hash(password));
        querySet.push(`password = $${queryValues.length}`);
    }
    if(avatar){
        queryValues.push(avatar);
        querySet.push(`avatar = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(user_id);
        query += `${querySet.join(', ')} WHERE user_id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error('No field given');
    }
};