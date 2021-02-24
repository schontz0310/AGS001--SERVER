import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

interface IRequestBody {
  email: string;
  password: string;
  company_type: string;
  company_cnpj_cpf: string;
}

export default class SessionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      email,
      password,
      company_type,
      company_cnpj_cpf,
    }: IRequestBody = request.body;
    const authenticateUser = container.resolve(AuthenticateUserService);
    const { user, token } = await authenticateUser.execute({
      email,
      password,
      company_type,
      company_cnpj_cpf,
    });

    delete user.users_password;

    return response.json({ user, token });
  }
}
