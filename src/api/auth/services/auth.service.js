import { badRequest, notFound } from "boom";
import UserModel from "./../models/users.model"

class AuthService {


    login(req,res,next){
        const {username,password,role} = req.body;
        if(!email || !password){
            throw badRequest()
        }
        const userRes = UserModel.findOne({
            where: {
                username: username,
                password: await bcrypt.hashSync(password, process.env.SALT || baseConfig.SALT),
                role: role
            }
        })

        if(!userRes){
            throw notFound();
        }
    }

}

export default AuthService;