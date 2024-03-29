import  express  from "express";
import {OauthLogin, blockUser, deleteUser,  follow,  getAllUsers,getSingleUser,login, register,updateUser} from '../controllers/usersController.js';
import authorize from '../../../middlewares/authentication.js';

const Router = express.Router();
Router.route('/').get(authorize,getAllUsers);
Router.route('/auth/login').post(login);
Router.route('/auth/register').post(register);
Router.route('/auth/OuthLogin').post(OauthLogin);
Router.route('/update/:id').patch(updateUser);
Router.route('/delete/:id').delete(deleteUser);
Router.route('/profile/:id').post(authorize ,updateUser);
export default Router