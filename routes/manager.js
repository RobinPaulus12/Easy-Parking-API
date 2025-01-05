import Router from 'express-promise-router';
import {updateUser} from '../controler/manager.js';
import {deleteUser} from '../controler/manager.js';
//import {authBasic} from '../middleware/identification/basic.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import {manager} from '../middleware/authorization/mustBe.js';
import {managerValidatorMiddleware as MVM} from '../middleware/validation.js';

const router = Router();

router.delete('/user/:user_id', checkJWT, manager, MVM.deleteUser, deleteUser);
router.patch('/user', checkJWT, manager, MVM.updateUser, updateUser);

export default router;