import companiesRouter from '@modules/Companies/infra/http/routes/companies.routes';
import devicesRouter from '@modules/Devices/infra/http/routes/devices.routes';
import banksRouter from '@modules/Suppliers/infra/http/routes/banks.routes';
import masterRouter from '@modules/Users/infra/http/routes/master.routes';
import masterSessionsRouter from '@modules/Users/infra/http/routes/masterSession.routes';
import sessionsRouter from '@modules/Users/infra/http/routes/session.routes';
import usersRouter from '@modules/Users/infra/http/routes/users.routes';

import { Router } from 'express';

const routes = Router();

routes.use('/sessions/master', masterSessionsRouter);
routes.use('/masters', masterRouter);
routes.use('/companies', companiesRouter);
routes.use('/devices', devicesRouter);



routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/banks', banksRouter);

export default routes;
  