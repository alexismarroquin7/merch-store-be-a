exports.up = async (knex) => {
  await knex.schema
  .createTable('genders', genders => {
    genders.increments('gender_id');
    genders.string('gender_name')
    .notNullable()
    .unique();
    genders.timestamp('gender_created_at')
    .defaultTo(knex.fn.now());
    genders.timestamp('gender_modified_at')
    .defaultTo(knex.fn.now());
  })
  .createTable('categories', categories => {
    categories.increments('category_id');
    categories.string('category_name')
    .notNullable()
    categories.timestamp('category_created_at')
    .defaultTo(knex.fn.now());
    categories.timestamp('category_modified_at')
    .defaultTo(knex.fn.now());
    categories.integer('gender_id')
    .unsigned()
    .notNullable()
    .references('gender_id')
    .inTable('genders')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');
  })
  .createTable('sub_categories', sub_categories => {
    sub_categories.increments('sub_category_id');
    sub_categories.string('sub_category_name')
    .notNullable();
    sub_categories.string('sub_category_text')
    .notNullable();
    sub_categories.timestamp('sub_category_created_at')
    .defaultTo(knex.fn.now());
    sub_categories.timestamp('sub_category_modified_at')
    .defaultTo(knex.fn.now());
    sub_categories.integer('category_id')
    .unsigned()
    .notNullable()
    .references('category_id')
    .inTable('categories')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('sub_categories')
  await knex.schema.dropTableIfExists('categories')
  await knex.schema.dropTableIfExists('genders')
}
