/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import CreatCompanyService from '@modules/Companies/service/CreateCompanyService';
import FindAllCompaniesService from '@modules/Companies/service/FindAllCompaniesService';
import {AssignDeviceInCompanyService} from '@modules/Companies/service/AssignDeviceInCompanyService';
import { ICreateCompaniesDTO } from '@modules/Companies/dtos/ICreateCompaniesDTO';
import IAssignDeviceDTO from '@modules/Devices/dtos/IAssignDeviceDTO';
import { DeassignDeviceInCompanyService } from '@modules/Companies/service/DeassignDeviceInCompanyService';
import { UpdateAvatarCompaniesService } from '@modules/Companies/service/UpdateAvatarCompaniesService';

export default class CompanyController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCompanyData: ICreateCompaniesDTO = request.body;
    const createCompany = container.resolve(CreatCompanyService);
    const company = await createCompany.execute(createCompanyData);
    return response.json(instanceToInstance(company));
  }

  public async findAll(
    _request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllCompanies = container.resolve(FindAllCompaniesService);
    const companies = await findAllCompanies.execute();
    return response.json(instanceToInstance(companies));
  }

  public async assign(request: Request, response: Response): Promise<Response> {
    const assignData: IAssignDeviceDTO = request.body;
    const assignDeviceService = container.resolve(AssignDeviceInCompanyService);
    const companie = await assignDeviceService.execute(assignData);
    return response.json(instanceToInstance(companie));
  }

  public async deassign(request: Request, response: Response): Promise<Response> {
    const assignData: IAssignDeviceDTO = request.body;
    const deassignDeviceService = container.resolve(DeassignDeviceInCompanyService);
    const companie = await deassignDeviceService.execute(assignData);
    return response.json(instanceToInstance(companie));
  }

  public async updateAvatar(request: Request, response: Response): Promise<Response> {
    const fileName = request.file?.filename;
    const {companyId} = request.body
    const updateAvatarService = container.resolve(UpdateAvatarCompaniesService);
    const companie = await updateAvatarService.execute({
      companyId,
      fileName: fileName || ''
    });
    return response.json(instanceToInstance(companie));
  }
}
