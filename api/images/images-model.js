const db = require('../data/db-config');


const findAll = async () => {
  return db('images as img')
  .select(
    'img.image_id',
    'img.image_src as src',
    'img.image_alt as alt',
    'img.image_title as title',
    'img.image_name as name',
    'img.image_description as description'
  )

}

module.exports = {
  findAll
}