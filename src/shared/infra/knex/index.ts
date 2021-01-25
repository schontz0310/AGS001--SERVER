import knex from 'knex';
import KnexConfig from '../../../../knexfile';

const connection = knex(KnexConfig.development);

export default connection;
