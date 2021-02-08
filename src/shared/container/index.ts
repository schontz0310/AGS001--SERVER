import { container } from 'tsyringe';

import '@modules/users/providers/index';
import '@shared/container/providers/index';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/knex/repositories/UsersRepository';

import IMasterUsersRepository from '@modules/users/repositories/IMasterUsersRepository';
import MasterUsersRepository from '@modules/users/infra/knex/repositories/MasterUsersRepository';

import ICompaniesRepository from '@modules/Companies/repositories/ICompaniesRepository';
import CompaniesRepository from '@modules/Companies/infra/knex/repositories/CompaniesRepositories';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IMasterUsersRepository>(
  'MasterUsersRepository',
  MasterUsersRepository,
);

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository,
);
