import {updateUser as updateU} from './user.js';
import {deleteUser as deleteU} from './user.js';

export const updateUser = (SQLClient, info) => {
    return updateU(SQLClient, info.user_id, info);
};

export const deleteUser = (SQLClient, info) => {
    return deleteU(SQLClient, info);
};

export const readManager = async (clientSQL, {username}) => {
    const {rows} = await clientSQL.query(
        'SELECT * FROM manager WHERE username = $1 ',
        [username]
    );
    return rows[0];
};