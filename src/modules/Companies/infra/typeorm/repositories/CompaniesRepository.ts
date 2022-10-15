import { ICreateCompaniesDTO } from '@modules/Companies/dtos/ICreateCompaniesDTO';
import ICompanyRepository from '@modules/Companies/repositories/ICompaniesRepository';
import { AppDataSource } from '@shared/infra/database/typeorm/data-source';
import { Repository } from 'typeorm';
import Company from '../entities/Company';

class CompaniesRepository implements ICompanyRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Company);
  }

  public async save(company: Company): Promise<Company> {
      return this.ormRepository.save(company)
  }

  public async create(data: ICreateCompaniesDTO): Promise<Company> {
    const company = this.ormRepository.create(data);
    const newCompany = await this.ormRepository.save(company);
    return newCompany;
  }

  public async checkExist(type_value: string): Promise<Company | null> {
    const formattedValue = type_value.replace(/[^0-9]+/g, '');
    const company = await this.ormRepository.findOne({
      where: {
        typeValue: formattedValue,
      },
    });
    return company;
  }

  public async findAll(): Promise<Company[]> {
    const companies = await this.ormRepository.find();
    return companies;
  }

  public async findById(id: string): Promise<Company | null> {
    const company = await this.ormRepository.findOne({
      where: { id },
    });
    return company;
  }
}

export default CompaniesRepository;
