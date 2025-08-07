import {hash} from '../util/index.js';


export const userExists = async (SQLClient, {username}) => {
    const {rows} = await SQLClient.query(
        'SELECT COUNT(*) FROM "user" WHERE username = $1',
        [username]
    );
    return rows.count > 0;
};
export const createUser = async (SQLClient, {name, firstname, date_of_birth, username, password, isAdmin}) => {
    const {rows} = await SQLClient.query(
        'INSERT INTO "user"(name, firstname, date_of_birth, username, password, isAdmin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id',
        [
            name,
            firstname,
            date_of_birth,
            username,
            await hash(password),
            isAdmin
        ]
    );
    return rows[0];
};

export const countAllUsers = async (SQLClient, search) => {
    return await SQLClient.query(
      `SELECT COUNT(*) FROM "user"
       WHERE name ILIKE $1 OR firstname ILIKE $1 OR username ILIKE $1`,
      [`%${search}%`]
    );
  };

export const getAllUsers = async (SQLClient,limit,offset,search) => {
    const query = `SELECT * FROM "user" 
    WHERE name ILIKE $1 OR firstname ILIKE $1 OR username ILIKE $1
    ORDER BY user_id ASC 
    LIMIT $2 OFFSET $3`;
    return await SQLClient.query(query,[`%${search}%`,parseInt(limit), parseInt(offset)]);
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

export const updateUser = async (SQLClient, user_id, {name, firstname, date_of_birth, username, password, isAdmin}) => {
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
    if(typeof isAdmin !== 'undefined'){
        queryValues.push(isAdmin);
        querySet.push(`isAdmin = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(user_id);
        query += `${querySet.join(', ')} WHERE user_id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error('No field given');
    }
};

export const updateUserByAdmin = async (SQLClient, user_id, {name, firstname, date_of_birth, username, password, isAdmin}) => {
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
    if(typeof isAdmin !== 'undefined'){
        queryValues.push(isAdmin);
        querySet.push(`isAdmin = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(user_id);
        query += `${querySet.join(', ')} WHERE user_id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error('No field given');
    }
};