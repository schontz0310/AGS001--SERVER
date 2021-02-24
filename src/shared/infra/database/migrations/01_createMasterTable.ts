import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('admin_users', table => {
    table
      .uuid('admin_users_id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('admin_users_name').notNullable();
    table.string('admin_users_email').notNullable();
    table.string('admin_users_password').notNullable();
    table
      .dateTime('admin_users_created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('admin_users_updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('admin_users');
}
