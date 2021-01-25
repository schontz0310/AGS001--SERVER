import connection from '@shared/infra/knex/index';
import ICompany from '@modules/Companies/infra/knex/entities/ICompany';
import IAdress from '@modules/Adress/infra/knex/entities/IAdress';
import ICompaniesRepository from '../../../repositories/ICompaniesRepository';
import ICreateCompaniesDTO from '../../../dtos/ICreateCompaniesDTO';

interface ICreateCompanyResponse extends ICompany {
  adress: IAdress;
}

class CompaniesRepository implements ICompaniesRepository {
  public async create({
    company_type,
    company_cnpj,
    company_cpf,
    company_name,
    company_adress,
  }: ICreateCompaniesDTO): Promise<ICreateCompanyResponse> {
    let company: ICompany;
    let adress: IAdress;

    await connection.transaction(async trx => {
      [company] = await connection('companies')
        .returning('*')
        .insert<ICompany[]>({
          company_type,
          company_cnpj,
          company_cpf,
          company_name,
        })
        .transacting(trx);

      [adress] = await connection('adress')
        .returning('*')
        .insert<IAdress[]>({
          adress_entity_id: company.company_id,
          adress_publicplace: company_adress.publicPlace,
          adress_number: company_adress.number,
          adress_neighborhood: company_adress.neighborhood,
          adress_state: company_adress.state,
          adress_city: company_adress.city,
          adress_postal_code: company_adress.postal_code,
        })
        .transacting(trx);
      await trx.commit();
    });

    return { ...company, adress };
  }

  public async CheckExist(
    type_value: string,
    company_type: string,
  ): Promise<ICompany | undefined> {
    const colummName = company_type === 'cnpj' ? 'company_cnpj' : 'company_cpf';

    const [company] = await connection('companies')
      .select('*')
      .where<ICompany[]>(colummName, type_value);
    return company;
  }
}

export default CompaniesRepository;
