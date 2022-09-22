import Bank from "../infra/typeorm/entities/Bank";

export type ICreateBankDTO = Pick<Bank, 'code' | 'name'>;
