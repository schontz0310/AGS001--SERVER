import { Router } from 'express';

import CompaniesController from '@modules/Companies/infra/http/controllers/CompaniesController';
import masterEnsureAuthenticated from '@shared/infra/http/middlewares/masterEnsureAuthenticated';

const companiesRouter = Router();

companiesRouter.use(masterEnsureAuthenticated);

const companiesController = new CompaniesController();

companiesRouter.post('/', companiesController.create);
companiesRouter.post('/assign-device', companiesController.assign);
companiesRouter.get('/', companiesController.findAll);

export default companiesRouter;
