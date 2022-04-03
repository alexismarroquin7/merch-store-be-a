const db = require('../data/db-config');


const findAll = async () => {
  const rows = await db('sub_categories as sub_cat')
  .join('categories as cat', 'cat.category_id', 'sub_cat.category_id')
  .join('genders as g', 'g.gender_id', 'cat.gender_id')

  const sub_categories = rows.map(row => {
    return {
      sub_category_id: row.sub_category_id,
      name: row.sub_category_name,
      created_at: row.sub_category_created_at,
      modified_at: row.sub_category_modified_at,
      category: {
        category_id: row.category_id,
        name: row.category_name,
        created_at: row.category_created_at,
        modified_at: row.category_modified_at
      },
      gender: {
        gender_id: row.gender_id,
        name: row.gender_name,
        created_at: row.gender_created_at,
        modified_at: row.gender_modified_at
      },
    }
  })
  
  return sub_categories;
}

module.exports = {
  findAll
}