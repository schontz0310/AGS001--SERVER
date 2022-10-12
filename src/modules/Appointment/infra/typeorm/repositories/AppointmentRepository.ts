import ICreateAppointmentDTO from '@modules/Appointment/dtos/ICreateAppointmentDTO';
import IAppointmentRepository from '@modules/Appointment/repositories/IAppointmentRepository';
import ICreateDeviceDTO from '@modules/Devices/dtos/ICreateDeviceDTO';
import IUpdateDeviceDTO from '@modules/Devices/dtos/IUpdateDeviceDTO';
import { getRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';

class AppointmentRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create(data: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create(data);
    await this.ormRepository.save(appointment);
    return appointment;
  }

}

export {AppointmentRepository};
