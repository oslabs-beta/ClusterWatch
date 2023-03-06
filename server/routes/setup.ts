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
  setupController.grafEmbed,
  (req: Request, res: Response): void => {
    res.sendStatus(200);
  }
);
router.get(
  '/forwardPort',
  setupController.forwardPort,
  (req: Request, res: Response): void => {
    res.sendStatus(200);
  }
);

export default router;
