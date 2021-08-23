/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { inject, injectable } from 'tsyringe';
import IDevicesRepository from '@modules/Devices/repositories/IDeviceRepository';
import Device from '../infra/typeorm/entities/Devices';
import IUpdateDeviceDTO from '../dtos/IUpdateDeviceDTO';

@injectable()
class UpdateDeviceService {
  constructor(
    @inject('DevicesRepository')
    private devicesRepository: IDevicesRepository,
  ) {}

  public async execute(data: IUpdateDeviceDTO): Promise<Device> {
    const device = await this.devicesRepository.updateDevice(data);
    return device;
  }
}
export default UpdateDeviceService;
