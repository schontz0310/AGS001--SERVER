import { Router } from 'express';

import UsersController from '@modules/Users/infra/http/controllers/UsersController';
import applicationEnsureAuthenticated from '@shared/infra/http/middlewares/applicationEnsureAuthenticated';

const usersRouter = Router();

usersRouter.use(applicationEnsureAuthenticated)

const usersController = new UsersController();

usersRouter.post('/', usersController.create);

export default usersRouter;
