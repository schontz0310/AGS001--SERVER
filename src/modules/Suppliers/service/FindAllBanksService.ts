import { inject, injectable } from 'tsyringe';
import Bank from '../infra/typeorm/entities/Bank';
import IBankRepository from '../repositories/IBanksRepository';

@injectable()
class FindAllBanksServices {
  constructor(
    @inject('BanksRepository')
    private banksRepository: IBankRepository,
  ) {}

  public async execute(): Promise<Bank[]> {
    const banks = await this.banksRepository.findAll();
    return banks;
  }
}
export default FindAllBanksServices;
