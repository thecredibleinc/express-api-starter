
class BaseService{

    getModelInstance(attrsObj){

    }

    getModel(){

    }

  /**
   * Get all resources.
   *
   * @returns {Promise}
   */
  async fetchAll(options) {
    try{
      options = this.sanitizeOptions(options)
      return  await this.getModel().findAll(options);
    }catch(err){
      return err;
    }
  }

  /**
   * Fetch a resource by any of it's Params
   * 
   * @param {String} param 
   * @param {String} paramvalue 
   */
  async fetchOne(options){
    try{
      options = this.sanitizeOptions(options)
      return await this.getModel().findOne(options)
    }catch(err){
      return err;
    } 
  }

  /**
   * Get a resource.
   *
   * @param   {Number|String}  id
   * @returns {Promise}
   */
  async fetchById(id) {
    try{
      return await this.getModel().findByPk(id)
    }catch(err){
      return err;
    }
  }

  // /**
  //  * Get all resources.
  //  *
  //  * @returns {Promise}
  //  */
  // fetchPage(options) {
  //   try{
  //     options = this.sanitizeOptions(options)
  //     return this.getModel().fetchPage(options);
  //   }catch(err){
  //     return err;
  //   }
    
  // }

  

  /**
   * Create new resource.
   *
   * @param   {Object}  resource
   * @returns {Promise}
   */
  async create(resourceAsObj) {
    try{
      return await this.getModel().create(resourceAsObj);
    }catch(err){
      return err;
    }
  }

  /**
   * Create new resource.
   *
   * @param   {Object}  resource
   * @returns {Promise}
   */
   async createBulk(resourcesArr) {
    try{
      return await this.getModel().bulkCreate(resourcesArr);
    }catch(err){
      return err;
    }
  }


  /**
   * Update a resource.
   *
   * @param   {Number|String}  id
   * @param   {Object}         resource
   * @returns {Promise}
   */
  async update(id,resource,options) {
    try{
      options = this.sanitizeOptions(options)
      options.where ={
        id:id
      };
      return await this.getModel().update(resource,options);
    }catch(err){
      return err;
    }
    
  }


  /**
   * delete a resource.
   * by defaults it only soft deletes
   *
   * @param   {Number|String}  id
   * @returns {Promise}
   */
  async delete(options,hardDelete = false) {
    try{
      options = this.sanitizeOptions(options)
      options = {
        ...options,
        force:hardDelete
      }
      return await this.getModel().destroy(options);
    }catch(err){
      return err;
    }
  }

  sanitizeOptions(options){
    if(typeof options === "undefined" ||  options == null ){
      options = {}
    }
    return options;
  }

}
export default BaseService;