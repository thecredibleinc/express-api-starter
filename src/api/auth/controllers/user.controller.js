 import BaseController from './../../common/controllers/baseController'
 import UserService from '../services/user.service'
 
 const service = new UserService();
 class UserController extends BaseController{

    getService(){
        return service;
    }

 }

 export default UserController;