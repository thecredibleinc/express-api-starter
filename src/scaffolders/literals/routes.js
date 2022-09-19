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

import { authMiddleware } from "../../auth/middlewares/auth.middleware"
import { all${resourceDenormalized}Actions } from "../config/${resourceSingular}.role"

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
        middlewareHolder.findAllMiddlewares =[authMiddleware(all${resourceDenormalized}Actions.get${resourceDenormalized})] 
        middlewareHolder.findOneMiddleares =[authMiddleware(all${resourceDenormalized}Actions.get${resourceDenormalized})] 
        middlewareHolder.createMiddleares = [authMiddleware(all${resourceDenormalized}Actions.manage${resourceDenormalized}),${resourceSingular}Validator];
        middlewareHolder.updateMiddleares= [authMiddleware(all${resourceDenormalized}Actions.manage${resourceDenormalized}),find${resourceDenormalized},${resourceSingular}Validator];
        middlewareHolder.deleteMiddleares = [authMiddleware(all${resourceDenormalized}Actions.manage${resourceDenormalized})];
        middlewareHolder.destroyMiddleares = [authMiddleware(all${resourceDenormalized}Actions.manage${resourceDenormalized})];
        return middlewareHolder
    }

}
export default ${resourceDenormalized}Routes;
`;
}

module.exports = literal