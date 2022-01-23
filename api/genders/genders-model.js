const db = require('../data/db-config');

const findAll = () => {
  return db('genders as g')
  .select(
    'g.gender_id',
    'g.gender_name as name',
    'g.gender_created_at as created_at',
    'g.gender_modified_at as modified_at',
  )
}

module.exports = {
  findAll
}