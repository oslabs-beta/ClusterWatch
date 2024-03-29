import express, { Router, Request, Response } from 'express';
import setupController from '../controllers/setupController';

const router: Router = express.Router();

router.get(
  '/promSetup',
  setupController.promInit,
  (req: Request, res: Response): void => {
    res.sendStatus(200);
  }
);
router.get(
  '/grafSetup',
  setupController.grafEmbed, setupController.redisInit,
  (req: Request, res: Response): void => {
    res.sendStatus(200);
  }
);
router.get(
  '/forwardPorts',
  setupController.redisInit, setupController.forwardPorts,
  (req: Request, res: Response): void => {
    res.sendStatus(200);
  }
);

export default router;
