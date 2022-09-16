 import BaseController from '../../common/controllers/baseController'
 import FilesService from '../services/files.service'
 
 const service = new FilesService();
 class FilesController extends BaseController{

    getService(){
        return service;
    }

 }

 export default FilesController;