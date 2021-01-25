import ICompany from '@modules/Companies/infra/knex/entities/ICompany';
import IAdress from '@modules/Adress/infra/knex/entities/IAdress';
import ICreateCompaniesDTO from '../dtos/ICreateCompaniesDTO';

interface ICreateCompanyResponse extends ICompany {
  adress: IAdress;
}

export default interface IUsersRepository {
  create(data: ICreateCompaniesDTO): Promise<ICreateCompanyResponse>;
  CheckExist(
    type_value: string,
    company_type: string,
  ): Promise<ICompany | undefined>;
}
