const { sub_categories } = require('../seed-data')

exports.seed = function(knex) {
  return knex('sub_categories').insert(sub_categories);
};
