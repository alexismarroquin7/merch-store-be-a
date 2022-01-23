const { genders } = require('../seed-data')

exports.seed = function(knex) {
  return knex('genders').insert(genders);
};
