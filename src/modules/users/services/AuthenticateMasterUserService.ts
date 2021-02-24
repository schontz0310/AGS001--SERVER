import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IMasterUsersRepository from '@modules/users/repositories/IMasterUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import IMasterUser from '@modules/users/infra/knex/entities/IMasterUser';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IMasterUser;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('MasterUsersRepository')
    private masterUsersRepository: IMasterUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.masterUsersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination!', 401);
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.admin_users_password,
    );

    if (!passwordMatch) {
      throw new AppError('Incorrect email/password combination!', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.admin_users_id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
export default AuthenticateUserService;
