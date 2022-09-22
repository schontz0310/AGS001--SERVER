/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { intelipostApi } from '@shared/infra/http/services/api.intelipost';
import { AxiosError } from 'axios';
import { injectable } from 'tsyringe';

@injectable()
class FindCepIntelipostService {
  public async execute(cep: string): Promise<any> {
    console.log('default headers', intelipostApi.defaults.headers);
    try {
      const findCep = await intelipostApi.get(
        `/cep_location/address_complete/${cep}`,
      );
      console.log('finf cep', findCep);
      console.log('default headers', intelipostApi.defaults.headers);
      return findCep;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
      return err?.response?.data;
    }
  }
}
export default FindCepIntelipostService;
