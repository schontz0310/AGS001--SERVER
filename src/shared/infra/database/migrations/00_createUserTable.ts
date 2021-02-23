import Knex from 'knex';

export async function up(knex: Knex) {
  await knex.raw('create extension if not exists "uuid-ossp"');
  return knex.schema.createTable('users', table => {
    table.uuid('users_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('users_name').notNullable();
    table.string('users_email').notNullable();
    table.string('users_company').notNullable();
    table.string('users_password').notNullable();
    table
      .dateTime('users_created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('users_updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
