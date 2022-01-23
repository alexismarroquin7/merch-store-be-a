const { inventory_images } = require('../seed-data')

exports.seed = function(knex) {
  return knex('inventory_images').insert(inventory_images);
};
