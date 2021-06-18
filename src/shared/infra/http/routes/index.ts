import { Router } from 'express';

import usersRouter from '@modules/Users/infra/http/routes/users.routes';
import masterRouter from '@modules/Users/infra/http/routes/master.routes';
import sessionsRouter from '@modules/Users/infra/http/routes/session.routes';
import masterSessionsRouter from '@modules/Users/infra/http/routes/masterSession.routes';
import companiesRouter from '@modules/Companies/infra/http/routes/companies.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/sessions/master', masterSessionsRouter);
routes.use('/users', usersRouter);
routes.use('/users/master', masterRouter);
routes.use('/companies', companiesRouter);
export default routes;
