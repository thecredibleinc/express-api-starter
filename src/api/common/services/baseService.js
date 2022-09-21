import path from "path"
import fs from "fs"
import {getMimeType} from "../../../utils/file.utils"
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
  async fetchById(id,options) {
    try{
      return await this.getModel().findByPk(id,options)
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
  async create(resourceAsObj,options) {
    try{
      // console.log("resourceAsObj",resourceAsObj)
      return await this.getModel().create(resourceAsObj,options);
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
  async delete(id,options,hardDelete = false) {
    try{
      options = this.sanitizeOptions(options)
      options = {
        ...options,
        where:{
          id:id,
        },
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

  async copyAllFiles(req,arg_filename_prefix=null,...argUploadFilePathRelative){
    //copy attached file in assets/worksheets/responses and add its path in attachment variable
    let result =  {errors:[],attachments:""}
    if(!req.files){
        return result;
    }
    const rawfiles = req.files;
    const files = Object.values(rawfiles);
    const file_key = Object.keys(rawfiles);
    const reqData = req.body;
    const errs = [];
    let attachments = "";
    for (const file_name of Object.keys(files)) {
        const file = files[file_name];
        let filename = file.path.split(path.sep).pop();
        filename = ""+Date.now()+"_"+filename
        if(arg_filename_prefix!=null){
            filename = arg_filename_prefix+"_"+file.fieldName+"_"+filename
        }
        const targetResourcePath = path.join( ...argUploadFilePathRelative);
        const targetPath = path.join(process.cwd(), 'resources', 'static', 'uploads', targetResourcePath,filename);
        const copyResult = await fs.promises.copyFile(file.path, targetPath).catch(err=>{
            console.log(err)
            errs.push(`Error uploading file: ${file.originalFilename}`);
        })
        if(copyResult instanceof Error) {
                console.log(copyResult)
                errs.push(`Error uploading file: ${file.originalFilename}`);
                // console.log(copyResult)
                // throw internal(`Error uploading file: ${file.originalFilename}`) 
                // next(internal(`Error uploading file: ${file.originalFilename}`))  
        } else {
                
            // reqData[file.fieldName] = `/assets/${targetResourcePath}/${filename}`;
            reqData["path"] = `/assets/${targetResourcePath}/${filename}`;
            reqData["mimeType"] = getMimeType(filename);
            reqData["location"] = 'local';//hard coded , change it to remote when u upload this to s3
            // reqData['path'] = `/assets/${targetResourcePath}/${filename}`;
            attachments  = attachments+`/assets/${targetResourcePath}/${filename},`
            // console.log(attachments)
        }
    }
    result.errors = errs;
    result.attachments = attachments

    return result;
}

}
export default BaseService;