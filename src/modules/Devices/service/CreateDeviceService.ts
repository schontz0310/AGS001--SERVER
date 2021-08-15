/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { inject, injectable } from 'tsyringe';
import IDevicesRepository from '@modules/Devices/repositories/IDeviceRepository';
import AppError from '@shared/errors/AppError';
import ICreateDeviceDTO from '../dtos/ICreateDeviceDTO';
import Device from '../infra/typeorm/entities/Devices';

@injectable()
class CreateDeviceService {
  constructor(
    @inject('DevicesRepository')
    private devicesRepository: IDevicesRepository,
  ) {}

  public async execute(data: ICreateDeviceDTO): Promise<Device> {
    const deviceExist = await this.devicesRepository.CheckExist(data.code);
    if (deviceExist) {
      throw new AppError('This device exist', 401);
    }
    const device = await this.devicesRepository.create(data);
    return device;
  }
}
export default CreateDeviceService;
