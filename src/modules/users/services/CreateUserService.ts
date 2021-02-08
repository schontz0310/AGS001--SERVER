import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IUser from '@modules/users/infra/knex/entities/IUser';

interface IRequest {
  users_name: string;
  users_email: string;
  users_password: string;
  users_company: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider /*
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider, */,
  ) {}

  public async execute({
    users_name,
    users_email,
    users_password,
    users_company,
  }: IRequest): Promise<IUser> {
    const checkEmailExist = await this.usersRepository.findByEmail(users_email);

    if (checkEmailExist) {
      throw new AppError('email already in use', 401);
    }

    // Rule of Crypto password
    const hashedPassword = await this.hashProvider.generateHash(users_password);

    const user = await this.usersRepository.create({
      users_name,
      users_email,
      users_password: hashedPassword,
      users_company,
    });

    return user;
  }
}

export default CreateUserService;
