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

const users = {
  TypeOrm: UsersRepositoryTypeOrm,
};

container.registerSingleton<IUsersRepository>('UsersRepository', users.TypeOrm);

container.registerSingleton<IMasterUsersRepository>(
  'MasterUsersRepository',
  MasterUsersRepository,
);

const repositories = {
  companyTypeOrm: CompaniesRepositoryTypeOrm,
  deviceTypeOrm: DevicesRepositoryTypeOrm,
  bankTypeOrm : BankRepositoryTypeOrm
};

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
