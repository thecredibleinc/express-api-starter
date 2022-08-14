import { Router } from 'express';
import TempController from '../controllers/temp.controller';

const router = Router();

const controller =  new TempController();

/**
 * GET /api/temps
 */
 router.get('/' ,(req,res,next)=>controller.fetchAll(req,res,next));

 export default router;