import { ICreateBankDTO } from '@modules/Suppliers/dtos/ICreateBankDTO';
import IBankRepository from '@modules/Suppliers/repositories/IBanksRepository';
import { AppDataSource } from '@shared/infra/http/database/typeorm/data-source';
import { Repository } from 'typeorm';
import Bank from '../entities/Bank';

class BankRepository implements IBankRepository {
  private ormRepository: Repository<Bank>;

  constructor() {
    this.ormRepository =  AppDataSource.getRepository(Bank);
  }

  public async save(bank: Bank): Promise<Bank> {
      return this.ormRepository.save(bank)
  }

  public async create(data: ICreateBankDTO): Promise<Bank> {
    const bank = this.ormRepository.create(data);
    const newBank = await this.ormRepository.save(bank);
    return newBank;
  }

  public async findAll(): Promise<Bank[]> {
    const banks = await this.ormRepository.find();
    return banks;
  }

  public async checkExist(code: number): Promise<Bank | null> {
    const bank = await this.ormRepository.findOne({
      where: {
        code: code,
      },
    });
    return bank;
  }

}

export default BankRepository;
