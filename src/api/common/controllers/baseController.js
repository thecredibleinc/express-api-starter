import HttpStatus from 'http-status-codes';
import ResponseFormatter from './../../../utils/responseFormatter.util';
class BaseController {

    /**
     * empty function to be overriden by children
     */
    getService(){

    }

    /**
     * Get all users.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    async fetchAll(req, res, next) {
        try{
            const data = await this.getService().fetchAll()
            res.json(ResponseFormatter.format(data))
        }catch(err){
            next(err)
        }
    }
    
    /**
     * Get a user by its id.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    async fetchById(req, res, next) {
        try{
            const data = await this.getService().fetchById(req.params.id)
            res.json(ResponseFormatter.format(data))
        }catch(err){
            next(err)
        }
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
            const data = await this.getService().create(req.body)
            res.status(HttpStatus.CREATED).json(ResponseFormatter.format(data))
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
            const data = await this.getService().update(req.params.id, req.body);
            res.json(ResponseFormatter.format(data))
        }catch(err){
            next(err)
        }
    }
    
    /**
     * Delete a user.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    async delete(req, res, next) {
        try{
            const data = await this.getService().destroy(req.body);
            res.status(HttpStatus.OK).json(buildResponse(data))
        }catch(err){
            next(err)
        }
    }

    /**
     * Delete a user.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */
    async destroy(req, res, next) {
        try{
            await this.getService().destroy(req.body,true)
            res.status(HttpStatus.OK).json(buildResponse(data))
        }catch(err){
            next(err)
        }
    }
}

export default BaseController;