import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();

const controller =  new AuthController();

/**
 * GET /api/temps
 */
 router.get('/' ,(req,res,next)=>controller.fetchAll(req,res,next));

 export default router;