/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { inject, injectable } from 'tsyringe';
import IDevicesRepository from '@modules/Devices/repositories/IDeviceRepository';
import { IResponseDeviceDTO } from '../dtos/IResponseDeviceDTO';

@injectable()
class FindAllDeviceService {
  constructor(
    @inject('DevicesRepository')
    private devicesRepository: IDevicesRepository,
  ) {}

  public async execute(): Promise<IResponseDeviceDTO[]> {
    const findAllDevices = await this.devicesRepository.findAllDevices();
    const devices: IResponseDeviceDTO[] = findAllDevices.map(device => {
      return {
        code: device.code,
        id: device.id,
        model: device.model,
        status: device.status,
        variant: device.variant,
        created_at: device.createdAt,
        updated_at: device.updatedAt,
      };
    });
    return devices;
  }
}
export default FindAllDeviceService;
