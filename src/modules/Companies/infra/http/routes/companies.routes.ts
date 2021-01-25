import { Router } from 'express';

import CompaniesController from '@modules/Companies/infra/http/controllers/CompaniesController';

const companiesRouter = Router();
const comapniesController = new CompaniesController();

companiesRouter.post('/', comapniesController.create);

export default companiesRouter;
