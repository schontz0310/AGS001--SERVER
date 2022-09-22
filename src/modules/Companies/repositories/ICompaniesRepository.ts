import { ICreateCompaniesDTO } from '../dtos/ICreateCompaniesDTO';
import Company from '../infra/typeorm/entities/Company';

export default interface ICompanyRepository {
  create(data: ICreateCompaniesDTO): Promise<Company>;
  save(company: Company): Promise<Company>;
  checkExist(type_value: string): Promise<Company | undefined>;
  findById(id: string): Promise<Company | undefined>;
  findAll(): Promise<Company[]>;
}
