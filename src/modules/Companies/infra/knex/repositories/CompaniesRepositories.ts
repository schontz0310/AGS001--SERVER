import connection from '@shared/infra/database/knex/connection';
import ICompany from '@modules/Companies/infra/knex/entities/ICompany';
import ICompaniesRepository from '@modules/Companies/repositories/ICompaniesRepository';
import ICreateCompaniesDTO from '../../../dtos/ICreateCompaniesDTO';

class CompaniesRepository implements ICompaniesRepository {
  public async create(
    createCompanyData: ICreateCompaniesDTO,
  ): Promise<ICompany> {
    const [company] = await connection('companies')
      .returning('*')
      .insert<ICompany[]>(createCompanyData)
      .returning<ICompany[]>('*');
    return company;
  }

  public async CheckExist(type_value: string): Promise<ICompany | undefined> {
    const [company] = await connection('companies')
      .select('*')
      .where<ICompany[]>('company_type_value', type_value);
    return company;
  }
}

export default CompaniesRepository;
