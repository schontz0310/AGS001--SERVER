/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { inject, injectable } from 'tsyringe';
import path from 'path';
import ICompaniesRepository from '@modules/Companies/repositories/ICompaniesRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ICreateCompaniesDTO from '../dtos/ICreateCompaniesDTO';
import Company from '../infra/typeorm/entities/Company';

@injectable()
class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  @Transactional()
  public async execute(
    createCompanyData: ICreateCompaniesDTO,
  ): Promise<Company> {
    const companyAndEmailExist = await this.companiesRepository.checkExist(
      createCompanyData.type_value,
    );
    if (companyAndEmailExist) {
      throw new AppError('This CNPJ/CPF Already in use', 401);
    }
    const unHashedPassword = createCompanyData.password;
    const hashedPassword = await this.hashProvider.generateHash(
      createCompanyData.password,
    );
    createCompanyData.password = hashedPassword;
    const company = await this.companiesRepository.create(createCompanyData);
    await this.usersRepository.create({
      user_name: company.user,
      user_email: company.email,
      user_password: company.password,
      user_company: company.id,
    });
    const createCompanyTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'create_company.hbs',
    );
    try {
      await this.mailProvider.sendMail({
        to: {
          name: company.contact,
          email: company.email,
        },
        subject: '[Agility in Solutions] Cadastro Realizado com Sucesso',
        templateData: {
          file: createCompanyTemplate,
          variables: {
            name: company.contact,
            company: company.name,
            email: company.email,
            type_value: company.type_value,
            password: unHashedPassword,
          },
        },
      });
    } catch (error) {
      throw new AppError(
        'Company created but send email confirmation failed',
        500,
      );
    }
    return company;
  }
}
export default CreateCompanyService;
