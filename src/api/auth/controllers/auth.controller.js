import BaseController from './../../common/controllers/baseController'
import AuthService from './../services/auth.service'
const service = new AuthService()
class AuthController {

    getService(){
        return service;
    }

    async login(req,res,next){
        const result = await service.login(req,res,next);
           
        
    }

    register(req,res,next){

    }

    login(req,res,next){

    }

}