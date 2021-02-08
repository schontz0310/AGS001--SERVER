import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateMasterUserService from '@modules/users/services/AuthenticateMasterUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateMasterUserService);
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.users_password;

    return response.json({ user, token });
  }
}
