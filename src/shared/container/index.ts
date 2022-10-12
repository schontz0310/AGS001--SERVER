import { container } from 'tsyringe';

import '@shared/container/providers/index';

import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import UsersRepositoryTypeOrm from '@modules/Users/infra/typeorm/repositories/UsersRepository';

import IMasterUsersRepository from '@modules/Users/repositories/IMasterUsersRepository';
import MasterUsersRepository from '@modules/Users/infra/typeorm/repositories/MasterUserRepository';

import ICompaniesRepository from '@modules/Companies/repositories/ICompaniesRepository';
import CompaniesRepositoryTypeOrm from '@modules/Companies/infra/typeorm/repositories/CompaniesRepository';

import IDevicesRepository from '@modules/Devices/repositories/IDeviceRepository';
import DevicesRepositoryTypeOrm from '@modules/Devices/infra/typeorm/repositories/DevicesRepository';
import IBankRepository from '@modules/Suppliers/repositories/IBanksRepository';
import BankRepositoryTypeOrm from '@modules/Suppliers/infra/typeorm/repositories/BankRepository';
import IAppointmentRepository from '@modules/Appointment/repositories/IAppointmentRepository';
import { AppointmentRepository } from '@modules/Appointment/infra/typeorm/repositories/AppointmentRepository';

const repositories = {
  masterTypeOrm: MasterUsersRepository,
  userTypeOrm: UsersRepositoryTypeOrm,
  companyTypeOrm: CompaniesRepositoryTypeOrm,
  deviceTypeOrm: DevicesRepositoryTypeOrm,
  bankTypeOrm : BankRepositoryTypeOrm,
  appointmentOrm: AppointmentRepository
};



container.registerSingleton<IMasterUsersRepository>(
  'MasterUsersRepository',
  repositories.masterTypeOrm,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
   repositories.userTypeOrm,
);

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  repositories.companyTypeOrm,
);

container.registerSingleton<IDevicesRepository>(
  'DevicesRepository',
  repositories.deviceTypeOrm,
);

container.registerSingleton<IBankRepository>(
  'BanksRepository',
  repositories.bankTypeOrm,
);

container.registerSingleton<IAppointmentRepository>(
  'AppointmentsRepository',
  repositories.appointmentOrm,
);
