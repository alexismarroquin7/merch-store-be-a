const { products } = require('../seed-data')

exports.seed = function(knex) {
  return knex('products').insert(products);
};
