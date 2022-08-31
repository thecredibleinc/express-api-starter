import { badRequest, notFound } from "@hapi/boom";
import UserModel from "./../models/users.model"

class AuthService {


    login(req,res,next){
        const {email,password,role} = req.body;
        if(!email || !password){
            throw badRequest()
        }
        const userRes = UserModel.findOne({
            where: {
                email: email,
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