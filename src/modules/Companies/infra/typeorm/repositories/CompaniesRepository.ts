import ICreateCompaniesDTO from '@modules/Companies/dtos/ICreateCompaniesDTO';
import ICompanyRepository from '@modules/Companies/repositories/ICompaniesRepository';
import { getRepository, Repository } from 'typeorm';
import Company from '../entities/Company';

class CompaniesRepository implements ICompanyRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  public async create(data: ICreateCompaniesDTO): Promise<Company> {
    const company = this.ormRepository.create(data);
    await this.ormRepository.save(company);
    return company;
  }

  public async checkExist(type_value: string): Promise<Company | undefined> {
    const formattedValue = type_value.replace(/[^0-9]+/g, '');
    const company = await this.ormRepository.findOne({
      where: {
        type_value: formattedValue,
      },
    });
    return company;
  }

  public async findAll(): Promise<Company[]> {
    const companies = await this.ormRepository.find();
    return companies;
  }

  public async findById(id: string): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne(id);
    return company;
  }
}

export default CompaniesRepository;
