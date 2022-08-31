import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

const controller =  new UserController();

/**
 * GET /api/users
 */
//  router.get('/', jwtMiddleware ,(req,res,next)=>controller.fetchAll(req,res,next));
 /**
 * GET /api/users
 */
  router.get('/' ,(req,res,next)=>controller.fetchAll(req,res,next));

 /**
  * GET /api/users/:id
  */
 router.get('/:id',(req,res,next)=>controller.fetchById(req,res,next));
 
 /**
  * POST /api/users
  * public api ( register)
  */
 router.post('/', (req,res,next)=>controller.create(req,res,next));
 
 /**
  * POST /api/users/signin
  * public api ( register)
  */
 router.post('/signin',(req,res,next)=> controller.signin(req,res,next));
 
 /**
  * PUT /api/users/:id
  */
 router.put('/:id',(req, res, next) => jwtMiddleware(req, res, next) ,(req,res,next)=>controller.update(req,res,next));
 
 /**
  * DELETE /api/users/:id
  */
 router.delete('/' , (req,res,next)=>controller.delete(req,res,next));

 /**
  * Hard DELETE /api/users/:id
  */
  router.delete('/hardDelete' , (req,res,next)=>controller.destroy(req,res,next));
 
 export default router;