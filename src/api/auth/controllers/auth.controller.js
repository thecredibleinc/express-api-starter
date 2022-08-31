import ResponseFormatter from '../../../utils/responseFormatter.util';
import BaseController from './../../common/controllers/baseController'
import AuthService from './../services/auth.service'
const service = new AuthService()
class AuthController {

    getService(){
        return service;
    }

    async login(req,res,next){
        try{
            const data = await service.login(req,res,next);
            res.json(ResponseFormatter.format(data));
        }catch(err){
            next(err)
        }
    }

    async register(req,res,next){
        try{
            const data = await service.register(req,res,next);
            res.json(ResponseFormatter.format(data));
        }catch(err){
            next(err)
        }
    }
}

export default AuthController;