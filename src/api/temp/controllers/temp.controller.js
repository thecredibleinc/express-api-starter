 import TempModel from './../models/temp.model'
 class TempController{

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