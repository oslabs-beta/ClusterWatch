import express, { Request, Response, Router } from 'express';
import alertController  from '../controllers/alertController';

const router: Router = express.Router();

router.post('/', alertController.createAlert, (req:Request, res:Response):void => {
  res.sendStatus(200);
});

export default router;
