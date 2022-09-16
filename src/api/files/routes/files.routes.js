import CrudMiddleWareHolder from "../../common/middlewares/crudMiddlewareHolder"
import BaseRoutes from "../../common/routes/base.routes"
import {fileValidator,findFiles} from "../validators/files.vallidator"
import FilesController from "../controllers/files.controller"
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
        middlewareHolder.createMiddleares = [fileValidator];
        middlewareHolder.updateMiddleares= [findFiles,fileValidator];
        return middlewareHolder
    }

}
export default FileRoutes;