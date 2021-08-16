import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMasterUserService from '@modules/Users/services/CreateMasterUserService';
import { classToClass } from 'class-transformer';
import UserMaster from '../../typeorm/entities/UserMaster';

interface CreateMasterUser {
  name: string;
  email: string;
  password: string;
  secret: string;
}

export default class MasterController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      secret,
    }: CreateMasterUser = request.body;

    const createMaster = container.resolve(CreateMasterUserService);

    const master = await createMaster.execute({
      name,
      email,
      password,
      secret,
    });
    return response.json(classToClass(master));
  }
}
