import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/Users/dtos/ICreateUserDTO';
import User from '@modules/Users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(user_id);
    return user;
  }

  public async findByEmailAndCompany(
    email: string,
    company_id: string,
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
        company_id,
      },
      relations: ['company'],
    });
    return user;
  }

  public async create({
    user_name,
    user_email,
    user_password,
    user_company,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name: user_name,
      email: user_email,
      password: user_password,
      company_id: user_company,
    });
    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
