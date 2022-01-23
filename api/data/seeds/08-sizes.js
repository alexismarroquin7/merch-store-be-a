const { sizes } = require('../seed-data')

exports.seed = function(knex) {
  return knex('sizes').insert(sizes);
};
