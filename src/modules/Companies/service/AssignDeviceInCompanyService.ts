/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { inject, injectable } from 'tsyringe';
import ICompaniesRepository from '@modules/Companies/repositories/ICompaniesRepository';
import IDevicesRepository from '@modules/Devices/repositories/IDeviceRepository';
import AppError from '@shared/errors/AppError';
import IAssignDeviceDTO from '@modules/Devices/dtos/IAssignDeviceDTO';
import Company from '../infra/typeorm/entities/Company';
import { DeviceStauts } from '@modules/Devices/infra/typeorm/entities/types';

@injectable()
export class AssignDeviceInCompanyService {
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
      throw new AppError('This device not exist', 401);
    }
    if (deviceExist.status === DeviceStauts.ACTIVE ) {
      throw new AppError('This device already in use', 401);
    }
    companyExist.devices = [
      ...companyExist.devices,
      deviceExist 
    ]
    
    const company = await this.companiesRepository.create(companyExist);

    return company;
  }
}
