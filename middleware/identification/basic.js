import {pool} from '../../database/database.js';
import {readPerson} from '../../model/person.js';

export const authBasic = async (req, res, next) => {
    const authorize = req.get('authorization');
    if(authorize?.includes('Basic')){
        const basicEncoded = authorize.split(' ')[1];
        const authString = Buffer.from(basicEncoded, 'base64').toString('utf-8');
        const [username, password] = authString.split(':');
        const person = await readPerson(pool, {username, password});
        if(person.id){
            req.session = person;
            next();
        } else {
            res.sendStatus(404);
        }
    } else {
        res.status(401).send('No basic authorization given');
    }
};