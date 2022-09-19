import CrudMiddleWareHolder from "../../common/middlewares/crudMiddlewareHolder"
import BaseRoutes from "../../common/routes/base.routes"
import {fileValidator,findFiles} from "../validators/files.vallidator"
import FilesController from "../controllers/files.controller"
import { authMiddleware } from "../../auth/middlewares/auth.middleware"
import { allFileActions } from "../config/file.role"



class FileRoutes extends BaseRoutes {
    routerPath = "/files";
    constructor(){
        super()
    }
    getController(){
        return new FilesController();
    }
    getMiddlewares(){
        const middlewareHolder = new CrudMiddleWareHolder();
        middlewareHolder.findAllMiddlewares =[authMiddleware(allFileActions.getFile)] 
        middlewareHolder.findOneMiddleares =[authMiddleware(allFileActions.getFile)] 
        middlewareHolder.createMiddleares = [authMiddleware(allFileActions.manageFile),fileValidator];
        middlewareHolder.updateMiddleares= [authMiddleware(allFileActions.manageFile),findFiles,fileValidator];
        middlewareHolder.deleteMiddleares = [authMiddleware(allFileActions.manageFile)];
        middlewareHolder.destroyMiddleares = [authMiddleware(allFileActions.manageFile)];
        return middlewareHolder
    }

}
export default FileRoutes;