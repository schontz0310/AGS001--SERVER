import Device from '@modules/Devices/infra/typeorm/entities/Devices';

export default interface ICreateCompaniesDTO {
  name: string;
  type: string;
  type_value: string;
  comment: string;
  address_street: string;
  address_number: string;
  address_district: string;
  address_state: string;
  address_city: string;
  address_zip_code: string;
  contact: string;
  phone: string;
  user: string;
  email: string;
  password: string;
  devices?: Device[];
  company_id?: string;
}
