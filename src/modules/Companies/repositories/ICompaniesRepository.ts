import { ICreateCompaniesDTO } from '../dtos/ICreateCompaniesDTO';
import Company from '../infra/typeorm/entities/Company';

export default interface ICompanyRepository {
  create(data: ICreateCompaniesDTO): Promise<Company>;
  save(company: Company): Promise<Company>;
  checkExist(typeValue: string): Promise<Company | null>;
  findById(id: string): Promise<Company | null >;
  findAll(): Promise<Company[]>;
}
