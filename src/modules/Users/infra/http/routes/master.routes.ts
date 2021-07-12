import { Router } from 'express';

import MasterController from '@modules/Users/infra/http/controllers/MasterController';

const masterRouter = Router();
const masterController = new MasterController();

masterRouter.post('/', masterController.create);

export default masterRouter;
