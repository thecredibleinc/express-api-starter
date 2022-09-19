import FileModel from "../models/files.model";
import BaseService from "../../common/services/baseService"
export default class FileService extends BaseService{

    getModelInstance(attrsObj){
        return new FileModel();
    }

    getModel(){
        return FileModel;
    }
}