/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { inject, injectable } from 'tsyringe';
import IDevicesRepository from '@modules/Devices/repositories/IDeviceRepository';

@injectable()
class DeleteDeviceService {
  constructor(
    @inject('DevicesRepository')
    private devicesRepository: IDevicesRepository,
  ) {}

  public async execute(id: string): Promise<boolean> {
    const result = await this.devicesRepository.deleteDevice(id);
    return result;
  }
}
export default DeleteDeviceService;
