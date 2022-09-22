/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import AuthenticateUserService from '@modules/Users/services/AuthenticateUserService';

interface IRequestBody {
  email: string;
  password: string;
  company_type: string;
  company_type_value: string;
}

export default class SessionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { email, password, company_type, company_type_value }: IRequestBody =
      request.body;
    const authenticateUser = container.resolve(AuthenticateUserService);
    const { user, token } = await authenticateUser.execute({
      email,
      password,
      company_type,
      company_type_value,
    });
    return response.json({ user: instanceToInstance(user), token });
  }
}
