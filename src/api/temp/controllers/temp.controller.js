 import TempModel from './../models/temp.model'
 import BaseController from './../../common/controllers/baseController'
 const service = new TempService()
 class TempController extends BaseController{

    getService(){
        return 
    }

    /**
     * Get all users.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    fetchAll(req, res, next){
        const tempAll =  TempModel.findAll().then(data=>{
            res.json(data)
        }).catch(err=>{
            next(err)
        });  
    }

 }

 export default TempController;