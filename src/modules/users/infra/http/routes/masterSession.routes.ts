import { Router } from 'express';

import MasterSessionsController from '@modules/users/infra/http/controllers/MasterSessionsController';

const sessionsRouter = Router();
const masterSessionsController = new MasterSessionsController();

sessionsRouter.post('/', masterSessionsController.index);

export default sessionsRouter;
