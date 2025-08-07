import Router from 'express-promise-router';
import {default as carRouter} from './car.js';
import {default as localityRouter} from './locality.js';
import {default as userRouter} from './user.js';
import {default as parkingRouter} from './parking.js';
import {default as placeRouter} from './place.js';

const router = Router();

router.use('/user', userRouter);
router.use('/car',carRouter);
router.use('/locality', localityRouter);
router.use('/parking', parkingRouter);
router.use('/place', placeRouter);

export default router;