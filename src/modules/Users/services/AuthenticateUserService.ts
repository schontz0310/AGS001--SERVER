import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import ICompaniesRepository from '@modules/Companies/repositories/ICompaniesRepository';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
  company_type_value: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({
    email,
    password,
    company_type_value,
  }: IRequest): Promise<IResponse> {
    // Application Rule - Check if first login user
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination!', 401);
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError('Incorrect email/password combination!', 401);
    }

    const checkCompanyExist = await this.companiesRepository.CheckExist(
      company_type_value,
    );
    if (!checkCompanyExist) {
      throw new AppError('Company Problem!', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
export default AuthenticateUserService;
