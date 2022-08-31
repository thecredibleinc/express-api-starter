import jwt from "jsonwebtoken";
import { readFileSync } from "fs";
import path from "path";
import { badData } from "boom";

class JwtUtil{

    static async createToken(data = {}, key= process.env.PRIVATE_KEY){
        if(Object.keys(data).length){
            try{
                var privateKEY  = readFileSync(path.join(process.cwd(), process.env.PUBLIC_KEY || "keys/jwtRS256.pem"), 'utf8');
                return jwt.sign(data, privateKEY, {
                    expiresIn: process.env.TOKEN_DEFAULT_TIMEOUT,
                    algorithm: "HS256" 
                });
            }catch(err){
                // throw new HttpException(404, speeches.UNABLE_TO_CREATE_TOKEN, err);
                return new Promise((resolve, reject)=>{
                    reject(err);
                });
            }
            
        }else{
            throw badData("payload empty while creating token");
        }
    }
    static getJwtPublicKey(){
        try{
            const publicKEY  = readFileSync(path.join(process.cwd(), process.env.PRIVATE_KEY || "keys/jwtRS256.pem"), 'utf8');
            return publicKEY;
        }catch(err){
            logger.info(err);
        }
        return null;
    }
    
    static  async validateToken(token){
        try{
            const publicKEY  = readFileSync(path.join(process.cwd(), process.env.PRIVATE_KEY || "keys/jwtRS256.pem"), 'utf8');
            return new Promise((resolve, reject)=>{
                jwt.verify(
                    token, 
                    publicKEY,(err, result)=>{
                        if(err){
                            reject(err);
                        }else{
                            resolve(result);
                        }
                });
            })
        }catch(err){
            return new Promise((resolve, reject)=>{
                console.log("-------------------------------------");
                reject(err);
            });
        }
    }

}

export default JwtUtil;