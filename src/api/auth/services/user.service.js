import UserModel from "../models/users.model";
import BaseService from "../../common/services/baseService"
export default class UserService extends BaseService{

    getModelInstance(attrsObj){
        return new UserModel();
    }

    getModel(){
        return UserModel;
    }

}