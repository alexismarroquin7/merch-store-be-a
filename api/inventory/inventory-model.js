const db = require('../data/db-config');

const findAll = async () => {
  return db('inventory as inv');
}

module.exports = {
  findAll
}