/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreatCompanyService from '@modules/Companies/service/CreateCompanyService';
import ICreateCompaniesDTO from '@modules/Companies/dtos/ICreateCompaniesDTO';
import Company from '../../typeorm/entities/Company';

export default class CompanyController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCompanyData: ICreateCompaniesDTO = request.body;
    const createCompany = container.resolve(CreatCompanyService);
    const company = await createCompany.execute(createCompanyData);
    return response.json(classToClass(company));
  }
}
