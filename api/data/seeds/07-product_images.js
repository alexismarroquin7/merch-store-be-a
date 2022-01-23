const { product_images } = require('../seed-data')

exports.seed = function(knex) {
  return knex('product_images').insert(product_images);
};
