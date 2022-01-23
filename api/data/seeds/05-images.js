const { images } = require('../seed-data')

exports.seed = function(knex) {
  return knex('images').insert(images);
};
