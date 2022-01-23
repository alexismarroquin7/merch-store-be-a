const { inventory } = require('../seed-data')

exports.seed = function(knex) {
  return knex('inventory').insert(inventory);
};
