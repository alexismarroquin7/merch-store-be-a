const { colors } = require('../seed-data')

exports.seed = function(knex) {
  return knex('colors').insert(colors);
};
