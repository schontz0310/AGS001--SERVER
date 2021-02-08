import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/session.routes';
import masterSessionsRouter from '@modules/users/infra/http/routes/masterSession.routes';
import companiesRouter from '@modules/Companies/infra/http/routes/companies.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/sessions/master', masterSessionsRouter);
routes.use('/users', usersRouter);

routes.use('/companies', companiesRouter);
export default routes;
