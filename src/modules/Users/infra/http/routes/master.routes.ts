import { Router } from 'express';

import MasterController from '@modules/Users/infra/http/controllers/MasterController';
import masterEnsureAuthenticated from '@shared/infra/http/middlewares/masterEnsureAuthenticated';

const masterRouter = Router();

masterRouter.use(masterEnsureAuthenticated)

const masterController = new MasterController();

masterRouter.post('/', masterController.create);

export default masterRouter;
