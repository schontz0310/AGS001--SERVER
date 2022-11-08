/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMasterUserService from '@modules/Users/services/CreateMasterUserService';
import { instanceToInstance } from 'class-transformer';

interface ICreateMasterUser {
  name: string;
  email: string;
  password: string;
  secret: string;
}

export default class MasterController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, secret }: ICreateMasterUser = request.body;

    const createMaster = container.resolve(CreateMasterUserService);

    const master = await createMaster.execute({
      name,
      email,
      password,
      secret,
    });
    return response.json(instanceToInstance(master));
  }
}
