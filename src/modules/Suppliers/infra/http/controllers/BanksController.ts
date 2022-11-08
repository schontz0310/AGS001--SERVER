/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import CreateBankService from '@modules/Suppliers/service/CreateBankService';
import FindAllBanksServices from '@modules/Suppliers/service/FindAllBanksService';
import {AssignDeviceInCompanyService} from '@modules/Companies/service/AssignDeviceInCompanyService';
import { ICreateCompaniesDTO } from '@modules/Companies/dtos/ICreateCompaniesDTO';
import IAssignDeviceDTO from '@modules/Devices/dtos/IAssignDeviceDTO';
import { DeassignDeviceInCompanyService } from '@modules/Companies/service/DeassignDeviceInCompanyService';
import { UpdateAvatarCompaniesService } from '@modules/Companies/service/UpdateAvatarCompaniesService';
import { ICreateBankDTO } from '@modules/Suppliers/dtos/ICreateBankDTO';

export default class BanksController {

  public async create(request: Request, response: Response): Promise<Response> {
    const createBankData: ICreateBankDTO = request.body;
    const createBank = container.resolve(CreateBankService);
    const bank = await createBank.execute(createBankData);
    return response.json(instanceToInstance(bank));
  }

  public async findAll(
    _request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllBanks = container.resolve(FindAllBanksServices);
    const banks = await findAllBanks.execute();
    return response.json(instanceToInstance(banks));
  }

}
