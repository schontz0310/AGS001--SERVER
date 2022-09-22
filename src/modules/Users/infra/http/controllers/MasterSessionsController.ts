/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateMasterUserService from '@modules/Users/services/AuthenticateMasterUserService';
import { instanceToInstance } from 'class-transformer';

export default class SessionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    console.log("aqui");
    console.log({request})
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateMasterUserService);
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });
    return response.json({ user: instanceToInstance(user), token });
  }
}
