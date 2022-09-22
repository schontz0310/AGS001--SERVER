import { inject, injectable } from 'tsyringe';
import ICompaniesRepository from '@modules/Companies/repositories/ICompaniesRepository';
import Company from '../infra/typeorm/entities/Company';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface UpdateFileParams {
  companyId: string;
  fileName: string; 
}

@injectable()
class UpdateAvatarCompaniesService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({companyId, fileName}: UpdateFileParams): Promise<Company> {
    const company = await this.companiesRepository.findById(companyId);
    if (!company) {
      throw new AppError('Company do not exist', 401);
    }
    if (company.avatar) {
      await this.storageProvider.deleteFile(company.avatar);
    }

    const newAvatar = await this.storageProvider.saveFile(fileName);

    company.avatar = newAvatar

    await this.companiesRepository.save(company)

    return company;
  }
}
export  {UpdateAvatarCompaniesService};
