const db = require('../data/db-config');


const findAll = async () => {
  return db('images as img')
  .select(
    'img.image_id',
    'img.image_src as src',
    'img.image_alt as alt',
    'img.image_title as title',
    'img.image_name as name',
    'img.image_description as description',
    'img.image_created_at as created_at',
    'img.image_modified_at as modified_at'
  )
}

const findById = async image_id => {
  const image = await db('images as img')
  .select(
    'img.image_id',
    'img.image_src as src',
    'img.image_alt as alt',
    'img.image_title as title',
    'img.image_name as name',
    'img.image_description as description',
    'img.image_created_at as created_at',
    'img.image_modified_at as modified_at'
  )
  .where({ 'img.image_id': image_id })
  .first()
  
  return image ? image : null;
}

module.exports = {
  findAll,
  findById
}