import { inject, injectable } from 'tsyringe';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IMasterUsersRepository from '@modules/Users/repositories/IMasterUsersRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

import MasterUser from '@modules/Users/infra/typeorm/entities/UserMaster';
import { compare } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
  secret: string;
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
    name,
    email,
    password,
    secret,
  }: IRequest): Promise<MasterUser> {
    const checkEmailExist = await this.masterUsersRepository.findByEmail(
      email,
    );

    if (checkEmailExist) {
      throw new AppError('email already in use', 401);
    }
    const secretMatch = secret === authConfig.masterSecret.passwordCreator ? true : false;
    if (!secretMatch) {
      throw new AppError('Incorrect secret', 401);
    }

    const hashedPassword = await this.hashProvider.generateHash(
      password,
    );

    const master = await this.masterUsersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return master;
  }
}
export default AuthenticateUserService;
