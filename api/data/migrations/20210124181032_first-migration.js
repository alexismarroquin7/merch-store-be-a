exports.up = async (knex) => {
  await knex.schema
  .createTable('genders', genders => {
    genders.increments('gender_id');
    genders.string('gender_name')
    .unique();
    genders.timestamp('gender_created_at')
    .defaultTo(knex.fn.now());
    genders.timestamp('gender_modified_at')
    .defaultTo(knex.fn.now());
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('genders')
}
