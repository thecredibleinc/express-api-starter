import { boomify,badRequest, notFound } from "@hapi/boom";
import bcrypt from 'bcrypt';
import UserModel from "./../models/users.model"
import JwtUtil from '../utils/jwt.util'
import speeches from '../../../utils/constants.util'
import { Model } from "sequelize";
class AuthService {


    async login(req,res,next){
        const {email,password,role} = req.body;
        if(!email || !password || !role){
            throw badRequest()
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
            throw badRequest(speeches.LOGIN_API_REQUIRED_FEILDS)
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
            throw badRequest(speeches.ALREADY_EXISTS);
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