 import BaseController from '../../common/controllers/baseController'
 import FilesService from '../services/files.service'
 
 const service = new FilesService();
 class FilesController extends BaseController{

    getService(){
        return service;
    }

    /**
     * Create a new user.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
     async create(req, res, next) {
        try{
            // console.log("files is ",req.files)
            const result = await this.getService().copyAllFiles(req,"","files")
            // console.log(result);
            // console.log("req_body",req.body)
            await super.create(req,res,next)
        }catch(err){
            next(err)
        }
    }
    
    /**
     * Update a user.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    async update(req, res, next) {
        try{
            const result = await this.getService().copyAllFiles(req,"","files")
            await super.update(req,res,next)
        }catch(err){
            next(err)
        }
    }

 }

 export default FilesController;