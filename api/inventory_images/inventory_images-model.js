const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('inventory_images as ii')
  .join('images as i', 'ii.image_id', 'i.image_id');
  
  const inventory_images = rows.map(row => {
    return {
      inventory_image_id: row.inventory_image_id,
      created_at: row.inventory_image_created_at,
      modified_at: row.inventory_image_modified_at,
      inventory_id: row.inventory_id,
      image: {
        image_id: row.image_id,
        name: row.image_name,
        title: row.image_title,
        alt: row.image_alt,
        description: row.image_description,
        src: row.image_src,
        created_at: row.image_created_at,
        modified_at: row.image_modified_at
      }
    }
  });
  
  return inventory_images;
}

const findById = async (inventory_image_id) => {
  const row = await db('inventory_images as ii')
  .join('images as i', 'ii.image_id', 'i.image_id')
  .where({
    'ii.inventory_image_id': inventory_image_id
  })
  .first();
  
  return row ? {
    inventory_image_id: row.inventory_image_id,
    created_at: row.inventory_image_created_at,
    modified_at: row.inventory_image_modified_at,
    inventory_id: row.inventory_id,
    image: {
      image_id: row.image_id,
      name: row.image_name,
      title: row.image_title,
      alt: row.image_alt,
      description: row.image_description,
      src: row.image_src,
      created_at: row.image_created_at,
      modified_at: row.image_modified_at
    }
  } : null;
}

const deleteByInventoryImageId = async (inventory_image_id) => {
  const inventory_image_to_delete = await findById(inventory_image_id);

  await db('inventory_images as ii')
  .where({
    inventory_image_id
  })
  .delete();

  return inventory_image_to_delete;
}

const create = async (inventory_image) => {
  const [ inventoryImage ] = await db('inventory_images as ii')
  .insert({
    inventory_id: inventory_image.inventory_id,
    image_id: inventory_image.image_id    
  }, ['ii.inventory_image_id']);

  const newInventoryImage = await findById(inventoryImage.inventory_image_id);

  return newInventoryImage;
}


module.exports = {
  findAll,
  findById,
  deleteByInventoryImageId,
  create
}