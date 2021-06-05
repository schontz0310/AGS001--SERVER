import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';
import CreateUserService from '@modules/Users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      users_name,
      users_email,
      users_password,
      users_company,
    } = await request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      users_name,
      users_email,
      users_password,
      users_company,
    });

    delete user.users_password;

    return response.json(user);
  }
}
