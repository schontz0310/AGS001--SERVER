/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { inject, injectable } from 'tsyringe';
import IDevicesRepository from '@modules/Devices/repositories/IDeviceRepository';
import Device from '../infra/typeorm/entities/Devices';

@injectable()
class FindAllDeviceService {
  constructor(
    @inject('DevicesRepository')
    private devicesRepository: IDevicesRepository,
  ) {}

  public async execute(): Promise<Device[]> {
    const findAllDevices = await this.devicesRepository.findAllDevices();
    return findAllDevices;
  }
}
export default FindAllDeviceService;
