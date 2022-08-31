import { badRequest, notFound } from "@hapi/boom";
import bcrypt from 'bcrypt';
import UserModel from "./../models/users.model"
import JwtUtil from '../utils/jwt.util'
import  {localization } from "../../../utils/localization/localization.util";
import { localeKeys } from "../../../utils/localization/localeKeys.util";
class AuthService {


    async login(req,res,next){
        const {email,password,role} = req.body;
        if(!email || !password || !role){
            throw badRequest(localization(localeKeys.LOGIN_API_REQUIRED_FIELDS))
        }
        const userRes = await UserModel.findOne({
            where: {
                email: email,
                password: await bcrypt.hashSync(password, process.env.SALT || baseConfig.SALT),
                role: role
            }
        })
        if(!userRes){
            throw notFound();
        }else if (userRes instanceof Error){
            throw userRes;
        }
        
        const jwtToken = JwtUtil.createToken(userRes.dataValues);
        if(jwtToken instanceof Error){
            throw jwtToken;
        }
        return {
            ...userRes.dataValues,
            token:jwtToken
        }

    }

    async register(req,res,next){
        const {email,password,role} = req.body;
        if(!email || !password || !role){
            throw badRequest(localization(localeKeys.LOGIN_API_REQUIRED_FIELDS))
        }
        const userRes = await UserModel.findOne({
            where: {
                email: email,
                password: await bcrypt.hashSync(password, process.env.SALT || baseConfig.SALT),
                role: role
            }
        })
        if (userRes instanceof Error){
            throw userRes;
        }
        else if(userRes){
            throw badRequest(localization(localeKeys.ALREADY_EXISTS));
        }

        const result = await UserModel.create(req.body)
        const jwtToken =  JwtUtil.createToken(result.dataValues);

        return {
            ...result.dataValues,
            token:jwtToken
        }
    }

}

export default AuthService;