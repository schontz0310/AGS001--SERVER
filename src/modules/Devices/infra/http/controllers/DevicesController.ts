/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import CreateDeviceService from '@modules/Devices/service/CreateDeviceService';
import FindAllDevicesService from '@modules/Devices/service/FindAllDevicesService';
import DeleteDeviceService from '@modules/Devices/service/DeleteDeviceService';
import UpdateDeviceService from '@modules/Devices/service/UpdateDeviceService';
import ICreateDeviceDTO from '@modules/Devices/dtos/ICreateDeviceDTO';
import IUpdateDeviceDTO from '@modules/Devices/dtos/IUpdateDeviceDTO';

export default class DeviceController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createDeviceData: ICreateDeviceDTO = request.body;
    const createDevice = container.resolve(CreateDeviceService);
    const device = await createDevice.execute(createDeviceData);
    return response.json(instanceToInstance(device));
  }

  public async findAllDevices(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllDevices = container.resolve(FindAllDevicesService);
    const devices = await findAllDevices.execute();
    return response.json(devices);
  }

  public async deleteDevice(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { deviceId } = request.params;
    const deleteDevice = container.resolve(DeleteDeviceService);
    const result = await deleteDevice.execute(deviceId);
    return result
      ? response.status(204).send()
      : response.status(500).json({
          message: 'operation problem',
        });
  }

  public async updateDevice(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { deviceId } = request.params;
    const { code, model, status, variant }: ICreateDeviceDTO = request.body;

    const data: IUpdateDeviceDTO = {
      deviceId,
      code,
      model,
      status,
      variant,
    };

    const updateDevice = container.resolve(UpdateDeviceService);
    const device = await updateDevice.execute(data);
    return response.json(instanceToInstance(device));
  }
}
