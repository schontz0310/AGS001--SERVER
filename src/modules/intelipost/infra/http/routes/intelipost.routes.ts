import { Router } from 'express';

import IntelipostController from '@modules/intelipost/infra/http/controllers/IntelipostController';

const intelipostRouter = Router();
const intelipostController = new IntelipostController();

intelipostRouter.get('/cepAutocomplete/:cep', intelipostController.findCep);

export default intelipostRouter;
