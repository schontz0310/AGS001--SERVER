import { ICreateBankDTO } from "../dtos/ICreateBankDTO";
import Bank from "../infra/typeorm/entities/Bank";

export default interface IBankRepository {
  checkExist(code: number): Promise<Bank | undefined>
  create(data: ICreateBankDTO): Promise<Bank>;
  save(bank: Bank): Promise<Bank>;
  findAll(): Promise<Bank[]>;
}
