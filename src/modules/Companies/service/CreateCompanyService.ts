import { inject, injectable } from 'tsyringe';
import ICompaniesRepository from '@modules/Companies/repositories/ICompaniesRepository';
import IAdress from '@modules/Adress/infra/knex/entities/IAdress';
import IAdressDTO from '@shared/dtos/IAdressDTO';
import AppError from '@shared/errors/AppError';
import ICompany from '../infra/knex/entities/ICompany';

interface IRequest {
  company_type: 'cnpj' | 'cpf';
  company_cnpj_cpf: string;
  company_name: string;
  company_adress: IAdressDTO;
}

interface ICreateCompanyResponse extends ICompany {
  adress: IAdress;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({
    company_type,
    company_cnpj_cpf,
    company_name,
    company_adress,
  }: IRequest): Promise<ICreateCompanyResponse> {
    const company_cnpj = company_type === 'cnpj' ? company_cnpj_cpf : '0';
    const company_cpf = company_type === 'cpf' ? company_cnpj_cpf : '0';

    // check if CNPJ/CPF exist
    const companyExist = await this.companiesRepository.CheckExist(
      company_cnpj_cpf,
      company_type,
    );

    if (companyExist) {
      throw new AppError('This CNPJ/CPF Already in use', 401);
    }

    const company = await this.companiesRepository.create({
      company_type,
      company_cpf,
      company_cnpj,
      company_name,
      company_adress,
    });
    return company;
  }
}

export default CreateUserService;
