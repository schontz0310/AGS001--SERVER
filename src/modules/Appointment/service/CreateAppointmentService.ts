/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import Appointment from '../infra/typeorm/entities/Appointment';
import IDeviceRepository from '@modules/Devices/repositories/IDeviceRepository';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentRepository,

    @inject('DevicesRepository')
    private devicesRepository: IDeviceRepository,
  ) {}

  public async execute(data: ICreateAppointmentDTO): Promise<Appointment> {
    const deviceExist = await this.devicesRepository.CheckExist(data.device);
    if (!deviceExist) {
      throw new AppError('This device not exist', 401);
    }
    const appointment = await this.appointmentRepository.create(data);
    return appointment;
  }
}
export {CreateAppointmentService};
