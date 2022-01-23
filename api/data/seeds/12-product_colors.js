const { product_colors } = require('../seed-data');
exports.seed = function(knex) {
  return knex('product_colors').insert(product_colors);
};
