import { Repository } from 'typeorm';

import IUsersTokensRepository from '@modules/Users/repositories/IUserTokensRepository';
import UserToken from '@modules/Users/infra/typeorm/entities/UserToken';
import { AppDataSource } from 'data-source';

class UserTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository =  AppDataSource.getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });
    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
