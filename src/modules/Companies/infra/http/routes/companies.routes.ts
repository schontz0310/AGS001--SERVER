import { Router } from 'express';

import CompaniesController from '@modules/Companies/infra/http/controllers/CompaniesController';

const companiesRouter = Router();
const companiesController = new CompaniesController();

companiesRouter.post('/', companiesController.create);

export default companiesRouter;
