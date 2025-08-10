import Router from 'express-promise-router';
import {
    getUserInfo,
    login,
    registration,
    updateUser,
    getAllUsers,
    deleteUser,
    updateUserByAdmin
} from '../controler/user.js';
//import {authBasic} from '../middleware/identification/basic.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import {admin} from '../middleware/authorization/mustBe.js';
import {userValidatorMiddleware as UVM} from '../middleware/validation.js';

const router = Router();

router.post('/registration', UVM.user, registration);
router.post('/login', UVM.login, login);
router.get('/me', checkJWT, getUserInfo);
router.get("/all/:pagenb", checkJWT, admin, getAllUsers);
router.patch('/me', checkJWT, UVM.update, updateUser);
router.delete('/user/:user_id', checkJWT, admin, UVM.deleteUser, deleteUser);
router.patch('/user', checkJWT, UVM.update, updateUser);
router.patch('/admin',checkJWT, admin, UVM.updateSchemaByAdmin,updateUserByAdmin);

export default router;