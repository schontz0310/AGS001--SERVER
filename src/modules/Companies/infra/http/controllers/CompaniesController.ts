import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';
import CreatCompanyService from '@modules/Companies/service/CreateCompanyService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      company_type,
      company_cnpj_cpf,
      company_name,
      company_adress,
    } = request.body;

    const createCompany = container.resolve(CreatCompanyService);
    console.log('inicio controller');
    const company = await createCompany.execute({
      company_type,
      company_cnpj_cpf,
      company_name,
      company_adress,
    });
    console.log('fim controller');
    return response.json(company);
  }
}
