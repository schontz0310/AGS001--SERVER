import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMasterUserService from '@modules/users/services/CreateMasterUserService';

interface ICreateMasterUser {
  admin_users_name: string;
  admin_users_email: string;
  admin_users_password: string;
  admin_users_secret: string;
}

export default class MasterController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      admin_users_name,
      admin_users_email,
      admin_users_password,
      admin_users_secret,
    }: ICreateMasterUser = request.body;

    const createMaster = container.resolve(CreateMasterUserService);

    const master = await createMaster.execute({
      admin_users_name,
      admin_users_email,
      admin_users_password,
      admin_users_secret,
    });

    delete master.admin_users_password;

    return response.json(master);
  }
}
