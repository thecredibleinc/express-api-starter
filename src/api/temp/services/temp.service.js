import TempModel from '../models/temp.model'
import BaseService from './../../common/services/baseService'
class TempService extends BaseService{

    getModelInstance(attrsObj){
        return new TempModel();
    }

    getModel(){
        return TempModel;
    }

}

export default TempService;