const string_ = require('../helpers/string');

function literal(resource) {
const resourceSingular = string_.singularizer(resource);
const resourceDenormalized = string_.denormalizer(resource);

  return `
  import ${resourceDenormalized}Model from "../models/${resourceSingular}.model";
  import BaseService from "../../common/services/baseService"
  export default class ${resourceDenormalized}Service extends BaseService{
  
      getModelInstance(attrsObj){
          return new ${resourceDenormalized}Model();
      }
  
      getModel(){
          return ${resourceDenormalized}Model;
      }
  }
`;
}

module.exports = literal