import Company from '../infra/typeorm/entities/Company';

export type ICreateCompaniesDTO = Omit<Company, 'devices'>;
