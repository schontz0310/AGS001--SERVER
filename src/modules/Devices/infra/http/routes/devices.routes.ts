import { Router } from 'express';

import DevicesController from '@modules/Devices/infra/http/controllers/DevicesController';
import masterEnsureAuthenticated from '@shared/infra/http/middlewares/masterEnsureAuthenticated';

const deviceRouter = Router();
deviceRouter.use(masterEnsureAuthenticated);
const devicesController = new DevicesController();

deviceRouter.post('/', devicesController.create);
deviceRouter.get('/find-all', devicesController.findAllDevices);
deviceRouter.delete('/:deviceId', devicesController.deleteDevice);
deviceRouter.patch('/:deviceId', devicesController.updateDevice);

export default deviceRouter;
