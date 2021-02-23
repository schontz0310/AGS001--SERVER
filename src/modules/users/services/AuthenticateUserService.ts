import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICompaniesRepository from '@modules/Companies/repositories/ICompaniesRepository';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import IUser from '@modules/users/infra/knex/entities/IUser';

interface IRequest {
  email: string;
  password: string;
  company_type: string;
  company_cnpj_cpf: string;
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

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({
    email,
    password,
    company_type,
    company_cnpj_cpf,
  }: IRequest): Promise<IResponse> {
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

    const checkCompanyExist = await this.companiesRepository.CheckExist(
      company_cnpj_cpf,
      company_type,
    );
    if (!checkCompanyExist) {
      throw new AppError('Company Problem!', 401);
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
