import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();

const controller =  new AuthController();

/**
 * GET /api/login
 */
 router.post('/login' ,(req,res,next)=>controller.login(req,res,next));
 router.post('/register' ,(req,res,next)=>controller.register(req,res,next));

 export default router;