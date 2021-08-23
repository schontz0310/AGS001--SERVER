/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreatCompanyService from '@modules/Companies/service/CreateCompanyService';
import FindAllCompaniesService from '@modules/Companies/service/FindAllCompaniesService';
import AssignDeviceInCompanyService from '@modules/Companies/service/AssignDeviceInCompanyService';
import ICreateCompaniesDTO from '@modules/Companies/dtos/ICreateCompaniesDTO';
import IAssignDeviceDTO from '@modules/Devices/dtos/IAssignDeviceDTO';

export default class CompanyController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCompanyData: ICreateCompaniesDTO = request.body;
    const createCompany = container.resolve(CreatCompanyService);
    const company = await createCompany.execute(createCompanyData);
    return response.json(classToClass(company));
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllCompanies = container.resolve(FindAllCompaniesService);
    const companies = await findAllCompanies.execute();
    return response.json(classToClass(companies));
  }

  public async assign(request: Request, response: Response): Promise<Response> {
    const assignData: IAssignDeviceDTO = request.body;
    const assignDeviceService = container.resolve(AssignDeviceInCompanyService);
    const companies = await assignDeviceService.execute(assignData);
    return response.json(classToClass(companies));
  }
}
