import ICreateAppointmentDTO from '@modules/Appointment/dtos/ICreateAppointmentDTO';
import IAppointmentRepository from '@modules/Appointment/repositories/IAppointmentRepository';
import { AppDataSource } from '@shared/infra/database/typeorm/data-source';
import { Repository } from 'typeorm';
import Appointment from '../entities/Appointment';

class AppointmentRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Appointment);
  }

  public async create(data: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create(data);
    await this.ormRepository.save(appointment);
    return appointment;
  }

}

export {AppointmentRepository};
