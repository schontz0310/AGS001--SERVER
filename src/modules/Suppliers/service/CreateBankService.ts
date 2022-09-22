/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { inject, injectable } from 'tsyringe';
import path from 'path';
import ICompaniesRepository from '@modules/Companies/repositories/ICompaniesRepository';
import AppError from '@shared/errors/AppError';
import { ICreateBankDTO } from '../dtos/ICreateBankDTO';
import Bank from '../infra/typeorm/entities/Bank';
import IBankRepository from '../repositories/IBanksRepository';

@injectable()
class CreateBankService {
  constructor(
    @inject('BanksRepository')
    private bankRepository: IBankRepository,
  ) {}

  public async execute(
    createBankData: ICreateBankDTO,
  ): Promise<Bank> {
    const bankExist = await this.bankRepository.checkExist(
      createBankData.code,
    );
    if (bankExist) {
      throw new AppError('This Bank Already in Exist', 401);
    }
    const bank = await this.bankRepository.create(createBankData);
   
    return bank
  }   
}
export default CreateBankService;
