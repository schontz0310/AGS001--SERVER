import { Router } from 'express';

import CompaniesController from '@modules/Companies/infra/http/controllers/CompaniesController';
import masterEnsureAuthenticated from '@shared/infra/http/middlewares/masterEnsureAuthenticated';
import multer from 'multer';
import upload from '@config/upload';

const companiesRouter = Router();

companiesRouter.use(masterEnsureAuthenticated);

const companiesController = new CompaniesController();
const uploadFile = multer(upload.multer)
companiesRouter.get('/', companiesController.findAll);
companiesRouter.post('/', companiesController.create);
companiesRouter.post('/assign-device', companiesController.assign);
companiesRouter.put('/deassign-device', companiesController.deassign);
companiesRouter.patch('/avatar', uploadFile.single('avatar'), companiesController.updateAvatar);

export default companiesRouter;
