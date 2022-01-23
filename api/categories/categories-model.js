const db = require('../data/db-config');


const findAll = async () => {
  const rows = await db('categories as cat')
  .join('genders as g', 'cat.gender_id', 'g.gender_id')

  const categories = rows.map(row => {
    return {
      category_id: row.category_id,
      name: row.category_name,
      created_at: row.category_created_at,
      modified_at: row.category_modified_at,
      gender:{
        gender_id: row.gender_id,
        name: row.gender_name,
        created_at: row.gender_created_at,
        modified_at: row.gender_modified_at
      }
    }
  });

  return categories;

}

module.exports = {
  findAll
}