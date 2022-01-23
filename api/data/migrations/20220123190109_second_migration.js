
exports.up = async function(knex) {
  await knex.schema
  .createTable('products', products => {
    products.increments('product_id')
    
    products.string('product_name')
    .unique()
    .notNullable()
    
    products.string('product_description', 200);

    products.decimal('product_valued_at')
    .notNullable();
    products.decimal('product_current_price')
    .notNullable();

    products.integer('sub_category_id')
    .unsigned()
    .notNullable()
    .references('sub_category_id')
    .inTable('sub_categories')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');

    products.timestamp('product_created_at')
    .defaultTo(knex.fn.now());
    products.timestamp('product_modified_at')
    .defaultTo(knex.fn.now());
  })
  .createTable('product_images', product_images => {
    product_images.increments('product_image_id')

    product_images.integer('image_id')
    .unsigned()
    .notNullable()
    .references('image_id')
    .inTable('images')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');

    product_images.integer('product_id')
    .unsigned()
    .notNullable()
    .references('product_id')
    .inTable('products')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');

    product_images.timestamp('product_image_created_at')
    .defaultTo(knex.fn.now());
    product_images.timestamp('product_image_modified_at')
    .defaultTo(knex.fn.now());
  })
  .createTable('sizes', sizes => {
    sizes.increments('size_id');
    sizes.string('size_name')
    .notNullable();
    sizes.integer('sub_category_id')
    .unsigned()
    .notNullable()
    .references('sub_category_id')
    .inTable('sub_categories')
    .onUpdate('CASCADE')
    .onUpdate('RESTRICT');

    sizes.timestamp('size_created_at')
    .defaultTo(knex.fn.now());
    sizes.timestamp('size_modified_at')
    .defaultTo(knex.fn.now());
  })
  .createTable('colors', colors => {
    colors.increments('color_id');
    colors.string('color_name')
    .notNullable()
    .unique();
    colors.string('color_description', 200);
    colors.timestamp('color_created_at')
    .defaultTo(knex.fn.now());
    colors.timestamp('color_modified_at')
    .defaultTo(knex.fn.now());
  })
  .createTable('inventory', inventory => {
    inventory.increments('inventory_id');
    
    inventory.integer('inventory_amount_in_stock')
    .notNullable();

    inventory.integer('size_id')
    .unsigned()
    .notNullable()
    .references('size_id')
    .inTable('sizes')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');
    
    inventory.integer('color_id')
    .unsigned()
    .notNullable()
    .references('color_id')
    .inTable('colors')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');
    
    inventory.integer('product_id')
    .unsigned()
    .notNullable()
    .references('product_id')
    .inTable('products')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');

    inventory.timestamp('inventory_created_at')
    .defaultTo(knex.fn.now());
    inventory.timestamp('inventory_modified_at')
    .defaultTo(knex.fn.now());
  })
  .createTable('inventory_images', inventory_images => {
    inventory_images.increments('inventory_image_id');

    inventory_images.integer('inventory_id')
    .unsigned()
    .notNullable()
    .references('inventory_id')
    .inTable('inventory')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');

    inventory_images.integer('image_id')
    .unsigned()
    .notNullable()
    .references('image_id')
    .inTable('images')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');

    inventory_images.timestamp('inventory_image_created_at')
    .defaultTo(knex.fn.now());
    inventory_images.timestamp('inventory_image_modified_at')
    .defaultTo(knex.fn.now());
  })
  .createTable('product_colors', product_colors => {
    product_colors.increments('product_color_id');
    
    product_colors.integer('product_id')
    .unsigned()
    .notNullable()
    .references('product_id')
    .inTable('products')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');
    
    product_colors.integer('color_id')
    .unsigned()
    .notNullable()
    .references('color_id')
    .inTable('colors')
    .onUpdate('CASCADE')
    .onDelete('RESTRICT');
    product_colors.timestamp('product_color_created_at')
    .defaultTo(knex.fn.now());
    product_colors.timestamp('product_color_modified_at')
    .defaultTo(knex.fn.now());
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('product_colors');
  await knex.schema.dropTableIfExists('inventory_images');
  await knex.schema.dropTableIfExists('inventory');
  await knex.schema.dropTableIfExists('colors');
  await knex.schema.dropTableIfExists('sizes');
  await knex.schema.dropTableIfExists('product_images');
  await knex.schema.dropTableIfExists('products');
};
