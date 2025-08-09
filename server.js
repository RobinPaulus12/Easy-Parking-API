import express from 'express';
import {default as Router} from './routes/index.js';
import {default as versioning} from "express-routes-versioning";
const routesVersioning = versioning();
const app = express();
import cors from 'cors'; 
const port = 3001;

app.use(cors());
app.use(express.json());

//---Versionning-----------------------------------
app.use(function(req, res, next) {
    req.version = req.get('accept-version');
    next();
});

app.use('/api',
    routesVersioning({  
        "1.0.0": respondV1
    })
 );

function respondV1(req, res, next) {
    app.use('/api', Router);
    next();
};

//----------------------------------------------

app.use(Router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});