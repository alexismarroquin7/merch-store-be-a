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
  .orderBy('img.image_id', 'asc')
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

const findBy = async (filter) => {
  const images = await db('images as img')
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
  .where(filter)
  .orderBy('img.image_id', 'asc');
  
  return images;
}

const updateByImageId = async (image_id, changes) => {
  const image = await findById(Number(image_id));

  const [updatedImage] = await db('images as i')
  .where({
    image_id
  })
  .update({
    image_name: changes.name,
    image_src: changes.src,
    image_alt: changes.alt,
    image_title: changes.title,
    image_modified_at: db.fn.now(),
    image_created_at: image.created_at
  }, ['i.image_id']);
  
  const imageToUse = await findById(updatedImage.image_id);

  return imageToUse;
}

module.exports = {
  findAll,
  findById,
  findBy,
  updateByImageId
}