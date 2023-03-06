import express, { Router, Request, Response } from 'express';
import clusterController from '../controllers/clusterController';

const router: Router = express.Router();

router.get(
  '/',
  clusterController.getClusterInfo,
  (req: Request, res: Response):void => {
    res.status(200).json(res.locals.clusterInfo);
  }
);

export default router;
