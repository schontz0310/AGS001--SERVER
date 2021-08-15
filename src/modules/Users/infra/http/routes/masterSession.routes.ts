import { Router } from 'express';

import MasterSessionsController from '@modules/Users/infra/http/controllers/MasterSessionsController';

const masterSessionsRouter = Router();
const masterSessionsController = new MasterSessionsController();

masterSessionsRouter.post('/', masterSessionsController.index);

export default masterSessionsRouter;
