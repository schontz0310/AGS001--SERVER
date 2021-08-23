import { inject, injectable } from 'tsyringe';
import ICompaniesRepository from '@modules/Companies/repositories/ICompaniesRepository';
import Company from '../infra/typeorm/entities/Company';

@injectable()
class FindAllCompaniesServices {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute(): Promise<Company[]> {
    const companies = await this.companiesRepository.findAll();
    return companies;
  }
}
export default FindAllCompaniesServices;
