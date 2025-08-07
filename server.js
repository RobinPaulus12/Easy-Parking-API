import express from 'express';
import {default as Router} from './routes/index.js';
const app = express();
import cors from 'cors'; 
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(Router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});