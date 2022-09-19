const string_ = require('../helpers/string');

function literal(resource) {
const resourceSingular = string_.singularizer(resource);
const resourceDenormalized = string_.denormalizer(resource);

  return `
/// ${resourceDenormalized} ROUTES ///
import CrudMiddleWareHolder from "../../common/middlewares/crudMiddlewareHolder"
import BaseRoutes from "../../common/routes/base.routes"
import {${resourceSingular}Validator,find${resourceDenormalized}} from "../validators/${resourceSingular}.validator"
import ${resourceDenormalized}Controller from "../controllers/${resourceSingular}.controller"
class ${resourceDenormalized}Routes extends BaseRoutes {
    routerPath = "/${resource}";
    constructor(){
        super()
    }
    getController(){
        return new ${resourceDenormalized}Controller();
    }
    getMiddlewares(){
        const middlewareHolder = new CrudMiddleWareHolder();
        middlewareHolder.createMiddleares = [${resourceSingular}Validator];
        middlewareHolder.updateMiddleares= [find${resourceDenormalized},${resourceSingular}Validator];
        return middlewareHolder
    }

}
export default ${resourceDenormalized}Routes;
`;
}

module.exports = literal