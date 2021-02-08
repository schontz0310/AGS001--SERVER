// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: '3.14.146.72',
      database: 'AGSteste',
      user: 'postgres',
      password: 'dev@20!',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
