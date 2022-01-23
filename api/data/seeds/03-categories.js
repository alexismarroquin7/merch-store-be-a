const { categories } = require('../seed-data')

exports.seed = function(knex) {
  return knex('categories').insert(categories);
};
