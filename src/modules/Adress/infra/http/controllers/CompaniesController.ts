import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';
import CreateUserService from '@modules/users/services/CreateUserService';
import IUser from '../../knex/entities/IUser';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      users_name,
      users_email,
      users_password,
      users_company,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      users_name,
      users_email,
      users_password,
      users_company,
    });

    delete user.users_password;

    return response.json(user);
    // return response.json(classToClass(user));
  }
}
