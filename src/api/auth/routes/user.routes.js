import { Router } from 'express';
import { allActions } from '../config/roles';
import UserController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { findUser, userValidator } from '../validators/user.vallidator';

const router = Router();

const controller =  new UserController();

/**
 * GET /api/users
 */
 router.get('/', authMiddleware(allActions.getUsers) ,(req,res,next)=>controller.fetchAll(req,res,next));
 /**
 * GET /api/users
 */
  router.get('/' ,(req,res,next)=>controller.fetchAll(req,res,next));

 /**
  * GET /api/users/:id
  */
 router.get('/:id',authMiddleware(allActions.getUsers),(req,res,next)=>controller.fetchById(req,res,next));
 
 /**
  * POST /api/users
  * public api ( register)
  */
 router.post('/',authMiddleware(allActions.manageUsers), userValidator,(req,res,next)=>controller.create(req,res,next));
 
 
 /**
  * PUT /api/users/:id
  */
 router.put('/:id',authMiddleware(allActions.manageUsers),findUser,userValidator,(req,res,next)=>controller.update(req,res,next));
 
 /**
  * DELETE /api/users/:id
  */
 router.delete('/' ,authMiddleware(allActions.manageUsers), (req,res,next)=>controller.delete(req,res,next));

 /**
  * Hard DELETE /api/users/:id
  */
  router.delete('/hardDelete' , authMiddleware(allActions.manageUsers),(req,res,next)=>controller.destroy(req,res,next));
 
 export default router;