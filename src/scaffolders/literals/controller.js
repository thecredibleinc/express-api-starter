const string_ = require('../helpers/string');

function literal(resource) {
const resourceSingular = string_.singularizer(resource);
const resourceDenormalized = string_.denormalizer(resource);

  return `
  import BaseController from '../../common/controllers/baseController'
  import ${resourceDenormalized}Service from '../services/${resourceSingular}.service'
  
  const service = new ${resourceDenormalized}Service();
  class ${resourceDenormalized}Controller extends BaseController{
 
     getService(){
         return service;
     }
  }
 
  export default ${resourceDenormalized}Controller;
`;
}

module.exports = literal