/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { inject, injectable } from 'tsyringe';
import ICompaniesRepository from '@modules/Companies/repositories/ICompaniesRepository';
import IDevicesRepository from '@modules/Devices/repositories/IDeviceRepository';
import AppError from '@shared/errors/AppError';
import IAssignDeviceDTO from '@modules/Devices/dtos/IAssignDeviceDTO';
import Device from '@modules/Devices/infra/typeorm/entities/Devices';
import Company from '../infra/typeorm/entities/Company';

@injectable()
class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('DevicesRepository')
    private devicesRepository: IDevicesRepository,
  ) {}

  public async execute(assignDeviceParams: IAssignDeviceDTO): Promise<Company> {
    const { companyId, deviceId } = assignDeviceParams;
    const companyExist = await this.companiesRepository.findById(companyId);
    if (!companyExist) {
      throw new AppError('This company not exist', 401);
    }

    const deviceExist = await this.devicesRepository.findById(deviceId);
    if (!deviceExist) {
      throw new AppError('This device already assigned', 401);
    }
    let devices: Device[] = [];
    if (companyExist.devices.length > 0) {
      devices = companyExist.devices.map(item => item);
    }

    devices.push(deviceExist);

    companyExist.devices = devices;

    const company = await this.companiesRepository.create(companyExist);

    return company;
  }
}
export default CreateCompanyService;
