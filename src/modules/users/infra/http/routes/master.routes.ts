import { Router } from 'express';

import MasterController from '@modules/users/infra/http/controllers/MasterController';

const masterRouter = Router();
const masterController = new MasterController();

masterRouter.post('/', masterController.create);

export default masterRouter;
