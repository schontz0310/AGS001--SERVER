import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateMasterUserService from '@modules/Users/services/AuthenticateMasterUserService';

export default class SessionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateMasterUserService);
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.admin_users_password;
    delete user.admin_users_created_at;
    delete user.admin_users_updated_at;

    return response.json({ user, token });
  }
}
