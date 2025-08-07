import {compare} from '../util/index.js';
import {readUserByUsername} from './user.js';


export const readPerson = async (clientSQL, {username, password}) => {
const responses = await readUserByUsername(clientSQL, {username});

    if (responses) {
        const statutUser = (responses.isadmin ? "admin" : "nonadmin")
        return await compare(password, responses.password) ?
            {id: responses.user_id, status: statutUser} :
            {id: null, status: null};
    } else {
        return {id: null, status: null};
    }
};