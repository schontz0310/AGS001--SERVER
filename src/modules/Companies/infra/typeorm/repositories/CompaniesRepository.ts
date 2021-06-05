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

  public async CheckExist(type_value: string): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne({
      where: {
        type_value,
      },
    });
    return company;
  }
}

export default CompaniesRepository;
