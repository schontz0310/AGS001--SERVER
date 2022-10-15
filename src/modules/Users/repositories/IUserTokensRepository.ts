import UserToken from '@modules/Users/infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  generate(user_id: string, company_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | null>;
}
