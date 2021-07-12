import { container } from 'tsyringe';

import '@shared/container/providers/index';

import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import UsersRepositoryTypeOrm from '@modules/Users/infra/typeorm/repositories/UsersRepository';

import IMasterUsersRepository from '@modules/Users/repositories/IMasterUsersRepository';
import MasterUsersRepository from '@modules/Users/infra/typeorm/repositories/MasterUserRepository';

import ICompaniesRepository from '@modules/Companies/repositories/ICompaniesRepository';
import CompaniesRepositoryTypeOrm from '@modules/Companies/infra/typeorm/repositories/CompaniesRepository';

const users = {
  TypeOrm: UsersRepositoryTypeOrm,
};

container.registerSingleton<IUsersRepository>('UsersRepository', users.TypeOrm);

container.registerSingleton<IMasterUsersRepository>(
  'MasterUsersRepository',
  MasterUsersRepository,
);

const repositories = {
  typeOrm: CompaniesRepositoryTypeOrm,
};

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  repositories.typeOrm,
);
