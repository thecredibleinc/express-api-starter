import { internal } from '@hapi/boom';
import { Router } from 'express';
import { allActions } from '../../auth/config/roles';
import { authMiddleware } from '../../auth/middlewares/auth.middleware';
import CrudMiddlewareHolder from "../../common/middlewares/crudMiddlewareHolder"

class BaseRoutes {
     router = Router();
     routerPath = "";
    
    
   getController(){

   }

   getMiddlewares(){

   }

   constructor(){
    
   } 

   setUpRoutes(argMainRouter,argRouterPath=null){
     if(argRouterPath){
          this.routerPath = argRouterPath; 
     }
     this.setUpBaseRoutes();
     argMainRouter.use(this.routerPath, this.router);
   }

   setUpBaseRoutes(){
     let middlewareHolder = new CrudMiddlewareHolder();
     middlewareHolder = this.getMiddlewares();
     if(!middlewareHolder instanceof CrudMiddlewareHolder){
          throw internal();
     }
     /**
     * GET All
     * find all 
     */
     this.router.get('/', middlewareHolder.findAllMiddlewares,(req,res,next)=>this.getController().fetchAll(req,res,next));
     

     /**
      * GET ONE
      * find one
      */
    this.router.get('/:id',middlewareHolder.findOneMiddleares,(req,res,next)=>this.getController().fetchById(req,res,next));
     
     /**
      * POST ONE
      * create
      */
    this.router.post('/', middlewareHolder.createMiddleares,(req,res,next)=>this.getController().create(req,res,next));
     
     
     /**
      * PUT /api/users/:id
      * update
      */
    this.router.put('/:id',middlewareHolder.updateMiddleares,(req,res,next)=>this.getController().update(req,res,next));
     
     /**
      * DELETE /api/users/:id
      * delete
      */
    this.router.delete('/:id' ,middlewareHolder.deleteMiddleares ,(req,res,next)=>this.getController().delete(req,res,next));

     /**
      * Hard DELETE /api/users/:id
      * destroy
      */
    this.router.delete('/hardDelete/:id' ,middlewareHolder.destroyMiddleares,(req,res,next)=>this.getController().destroy(req,res,next));
   }

}

export default BaseRoutes;