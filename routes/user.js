import Router from 'express-promise-router';
import {
    getUserInfo,
    login,
    registration,
    updateUser,
    getAllUsers
} from '../controler/user.js';
//import {authBasic} from '../middleware/identification/basic.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import {manager} from '../middleware/authorization/mustBe.js';
import {userValidatorMiddleware as UVM} from '../middleware/validation.js';

const router = Router();

router.post('/registration', UVM.user, registration);
router.post('/login', UVM.login, login);
router.get('/me', checkJWT, getUserInfo);
router.get('/all', checkJWT, manager, getAllUsers);
router.patch('/me', checkJWT, UVM.update, updateUser);

export default router;