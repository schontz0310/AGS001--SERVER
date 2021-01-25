import connection from '@shared/infra/knex/index';
import ICompany from '@modules/Companies/infra/knex/entities/ICompany';
import IAdressDTO from '@shared/dtos/IAdressDTO';
import { QueryInterface } from 'knex';
import AppError from '@shared/errors/AppError';
import ICompaniesRepository from '../../../repositories/ICompaniesRepository';
import ICreateCompaniesDTO from '../../../dtos/ICreateCompaniesDTO';

interface IResponse extends ICompany, IAdressDTO {}

class CompaniesRepository implements ICompaniesRepository {
  private companyConnection: QueryInterface;

  private adressConnection: QueryInterface;

  constructor() {
    this.companyConnection = connection('companies');
    this.adressConnection = connection('adress');
  }

  public async create({
    company_type,
    company_cnpj,
    company_cpf,
    company_name,
  }: ICreateCompaniesDTO): Promise<> {
    /* const company = await this.companyConnection
      .returning('*')
      .insert<ICompany[]>({
        company_type,
        company_cnpj,
        company_cpf,
        company_name,
      }); */

    try {
      const company = await this.companyConnection
        .returning('*')
        .insert<ICompany[]>({
          company_type,
          company_cnpj,
          company_cpf,
          company_name,
        });

      const adress = await this.adressConnection
        .returning('*')
        .insert<ICompany[]>({
          company_type,
          company_cnpj,
          company_cpf,
          company_name,
        });

      return company[0];
    } catch {
      throw new AppError('register failed', 401);
    }
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.userConnection
      .select('*')
      .where<IUser[]>('users_email', email);
    return user[0];
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const user = this.userConnection.where('users_id', id).select('*');
    return undefined;
  }

  public async save({
    users_company,
    users_name,
    users_email,
    users_password,
    users_id,
  }: IUser): Promise<IUser | undefined> {
    const user = await connection('users')
      .returning('*')
      .where({ users_id })
      .update({
        users_company,
        users_name,
        users_email,
        users_password,
        users_id,
      });

    return undefined;
  }
}

export default CompaniesRepository;
