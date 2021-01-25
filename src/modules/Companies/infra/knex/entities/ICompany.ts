export default interface ICompany {
  company_id: string;
  company_type: 'cnpj' | 'cpf';
  company_cnpj: string;
  company_cpf: string;
  company_name: string;
  company_created_at: Date;
  company_updated_at: Date;
}
