/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import FindCepIntelipostService from '@modules/intelipost/service/FindCepIntelipostService';

export default class IntelipostController {
  public async findCep(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { cep } = request.params;
    const findCep = container.resolve(FindCepIntelipostService);
    const device = await findCep.execute(cep);
    return response.json(instanceToInstance(device));
  }
}
