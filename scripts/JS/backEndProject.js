import {readFileSync} from 'node:fs';
import {pool} from '../../database/database.js';


// cette fonction asynchrone lit le fichier sql pour recuperer les requetes
const requests = readFileSync(
    'scripts/SQL/backEndProject.sql',
    {encoding: 'utf-8'}
);


// on demande  a la pool d'executer l'ensemble des requetes
try {
    await pool.query(requests, []); // nous attendons que la requetes soit effectuer
    console.log('done');
} catch (e) {
    console.error(e);
}