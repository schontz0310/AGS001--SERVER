import ICreateCompaniesDTO from '../dtos/ICreateCompaniesDTO';
import Company from '../infra/typeorm/entities/Company';

export default interface ICompanyRepository {
  create(data: ICreateCompaniesDTO): Promise<Company>;
  CheckExist(type_value: string): Promise<Company | undefined>;
}
