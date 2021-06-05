import * as Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('companies', table => {
    table
      .uuid('company_id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('company_name').notNullable();
    table.string('company_type').notNullable();
    table.string('company_type_value').notNullable();
    table.string('company_comment').nullable();

    table.string('company_zip_code').notNullable();
    table.string('company_address_street').notNullable();
    table.string('company_address_number').notNullable();
    table.string('company_address_district').notNullable();
    table.string('company_address_city').notNullable();
    table.string('company_address_state').notNullable();

    table.string('company_contact').notNullable();
    table.string('company_phone').notNullable();

    table.string('company_user').notNullable();
    table.string('company_email').notNullable();
    table.string('company_password').notNullable();

    table
      .dateTime('company_created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime('company_updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('companies');
}
