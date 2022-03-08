/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { inject, injectable } from 'tsyringe';
import ICompaniesRepository from '@modules/Companies/repositories/ICompaniesRepository';
import IDevicesRepository from '@modules/Devices/repositories/IDeviceRepository';
import AppError from '@shared/errors/AppError';
import IAssignDeviceDTO from '@modules/Devices/dtos/IAssignDeviceDTO';
import Company from '../infra/typeorm/entities/Company';
import { DeviceStauts } from '@modules/Devices/infra/typeorm/entities/types';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@injectable()
export class DeassignDeviceInCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('DevicesRepository')
    private devicesRepository: IDevicesRepository,
  ) {}

  @Transactional()
  public async execute(assignDeviceParams: IAssignDeviceDTO): Promise<Company> {
    const { companyId, deviceId } = assignDeviceParams;

    const deviceExist = await this.devicesRepository.findById(deviceId);
    if (!deviceExist) {
      throw new AppError('This device not exist', 401);
    }
    if (deviceExist.status !== DeviceStauts.INACTIVE ) {
      await this.devicesRepository.updateDevice({
        deviceId: deviceExist.id,
        code: deviceExist.code,
        model: deviceExist.model,
        variant: deviceExist.variant,
        status: DeviceStauts.INACTIVE
      }) 
    }

    const companyExist = await this.companiesRepository.findById(companyId);
    if (!companyExist) {
      throw new AppError('This company not exist', 401);
    }

    const updatedDevices = companyExist.devices.filter(device => device.id !== deviceId)

    companyExist.devices = updatedDevices

    const company = await this.companiesRepository.create(companyExist);

    return company;
  }
}
