import jwt from "jsonwebtoken";
import { readFileSync } from "fs";
import path from "path";
import { badData } from "@hapi/boom";

class JwtUtil{

    static createToken(data = {}, key= process.env.PRIVATE_KEY){
        if(Object.keys(data).length){
            try{
                var privateKEY  = readFileSync(path.join(process.cwd(), process.env.PUBLIC_KEY || "keys/jwtRS256.pem"), 'utf8');
                return jwt.sign(data, privateKEY, {
                    expiresIn: process.env.TOKEN_DEFAULT_TIMEOUT,
                    algorithm: "HS256" 
                });
            }catch(err){
                return err;
            }
        }else{
            return badData("payload empty while creating token");
        }
    }
    static getJwtPublicKey(){
        try{
            const publicKEY  = readFileSync(path.join(process.cwd(), process.env.PRIVATE_KEY || "keys/jwtRS256.pem"), 'utf8');
            return publicKEY;
        }catch(err){
            return err;
        }
    }
    
    static async validateToken(token){
        try{
            const publicKEY  = readFileSync(path.join(process.cwd(), process.env.PRIVATE_KEY || "keys/jwtRS256.pem"), 'utf8');
            return await jwt.verify(token,publicKEY);
        }catch(err){
            return err;
        }
    }

}

export default JwtUtil;