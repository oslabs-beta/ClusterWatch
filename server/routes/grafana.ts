import express, { Router, Request, Response } from 'express';
import apiController from '../controllers/apiController';

const router: Router = express.Router();



router.get('/key', apiController.getApi, (req: Request, res: Response):void => {
  res.status(200).json(res.locals.key);
});
router.post('/uid', apiController.getUid, (req: Request, res: Response):void => {
  res.status(200).json(res.locals.uid);
});

export default router;
