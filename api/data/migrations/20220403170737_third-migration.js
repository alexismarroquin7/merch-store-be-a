
exports.up = async function(knex) {
  await knex.schema
  .createTable('roles', roles => {
    roles.increments('role_id');
    roles.string('role_name')
    .unique()
    .notNullable();

    roles.string('role_description', 200);
    
    roles.timestamp('role_created_at')
    .defaultTo(knex.fn.now());
    
    roles.timestamp('role_modified_at')
    .defaultTo(knex.fn.now());


  })
  .createTable('users', users => {
    users.increments('user_id');
    users.string('username');
    
    users.string('email')
    .unique()
    .notNullable();
    
    users.integer('email_confirmed');
    users.string('password');

    users.integer('role_id')
    .unsigned()
    .notNullable()
    .references('role_id')
    .inTable('roles')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');
    
    users.timestamp('user_created_at')
    .defaultTo(knex.fn.now());
    users.timestamp('user_modified_at')
    .defaultTo(knex.fn.now());
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('roles');
};
