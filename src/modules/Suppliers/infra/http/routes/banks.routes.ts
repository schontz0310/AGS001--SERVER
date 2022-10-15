import { Router } from 'express';

import BanksController from '@modules/Suppliers/infra/http/controllers/BanksController';
import ensureAuthenticated from '@shared/infra/http/middlewares/applicationEnsureAuthenticated';

const banksRouter = Router();

banksRouter.use(ensureAuthenticated);

const bankController = new BanksController();

banksRouter.post('/', bankController.create);
banksRouter.get('/', bankController.findAll);

export default banksRouter;
