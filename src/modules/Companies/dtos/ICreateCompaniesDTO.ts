import IAdressDTO from '@shared/dtos/IAdressDTO';

export default interface ICreateCompaniesDTO {
  company_type: string;
  company_cnpj: string;
  company_cpf: string;
  company_name: string;
  company_adress: IAdressDTO;
}
