import {compare} from '../util/index.js';
import {readUserByUsername} from './user.js';
import {readManager} from './manager.js';

export const readPerson = async (clientSQL, {username, password}) => {
    const responses = await Promise.all([
        readUserByUsername(clientSQL, {username}),
        readManager(clientSQL, {username})
    ]);

    if (responses[0]) {
        return await compare(password, responses[0].password) ?
            {id: responses[0].user_id, status: 'user'} :
            {id: null, status: null};
    } else if (responses[1]) {
        return await compare(password, responses[1].password) ?
            {id: responses[1].manager_id, status: 'manager'} :
            {id: null, status: null};
    } else {
        return {id: null, status: null};
    }
};