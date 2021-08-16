import companiesRouter from '@modules/Companies/infra/http/routes/companies.routes';
import devicesRouter from '@modules/Devices/infra/http/routes/devices.routes';
import masterRouter from '@modules/Users/infra/http/routes/master.routes';
import masterSessionsRouter from '@modules/Users/infra/http/routes/masterSession.routes';
import sessionsRouter from '@modules/Users/infra/http/routes/session.routes';
import usersRouter from '@modules/Users/infra/http/routes/users.routes';

import { Router } from 'express';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/sessions/master', masterSessionsRouter);

routes.use('/users', usersRouter);

routes.use('/users/master', masterRouter);
routes.use('/companies', companiesRouter);
routes.use('/devices', devicesRouter);

export default routes;
