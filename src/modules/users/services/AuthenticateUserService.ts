import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import IUser from '@modules/users/infra/knex/entities/IUser';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination!', 401);
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.users_password,
    );

    if (!passwordMatch) {
      throw new AppError('Incorrect email/password combination!', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.users_id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
export default AuthenticateUserService;
