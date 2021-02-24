import { inject, injectable } from 'tsyringe';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IMasterUsersRepository from '@modules/users/repositories/IMasterUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import IMasterUser from '@modules/users/infra/knex/entities/IMasterUser';

interface IRequest {
  admin_users_name: string;
  admin_users_email: string;
  admin_users_password: string;
  admin_users_secret: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('MasterUsersRepository')
    private masterUsersRepository: IMasterUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    admin_users_name,
    admin_users_email,
    admin_users_password,
    admin_users_secret,
  }: IRequest): Promise<IMasterUser> {
    const checkEmailExist = await this.masterUsersRepository.findByEmail(
      admin_users_email,
    );

    if (checkEmailExist) {
      throw new AppError('email already in use', 401);
    }

    const secretMatch = await this.hashProvider.compareHash(
      admin_users_secret,
      authConfig.masterSecret.secret,
    );

    if (!secretMatch) {
      throw new AppError('Incorrect secret', 401);
    }

    const hashedPassword = await this.hashProvider.generateHash(
      admin_users_password,
    );

    const master = await this.masterUsersRepository.create({
      admin_users_name,
      admin_users_email,
      admin_users_password: hashedPassword,
    });

    return master;
  }
}
export default AuthenticateUserService;
