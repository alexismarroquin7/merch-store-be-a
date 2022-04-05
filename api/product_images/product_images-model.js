const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('product_images as pi')
  .join('images as i', 'pi.image_id', 'i.image_id');

  const product_images = rows.map(row => {
    return {
      product_image_id: row.product_image_id,
      product_id: row.product_id,
      created_at: row.product_image_created_at,
      modified_at: row.product_image_modified_at,
      image: {
        image_id: row.image_id,
        name: row.image_name,
        description: row.image_description,
        title: row.image_title,
        alt: row.image_alt,
        src: row.image_src,
        created_at: row.image_created_at,
        modified_at: row.image_modified_at
      }
    }
  })
  return product_images;
}

const deleteByProductImageId = async (product_image_id) => {
  const product_images = await findAll();
  const [product_image] = product_images.filter(pi => pi.product_image_id === Number(product_image_id));
  
  await db('product_images as pi')
  .where({
    product_image_id: Number(product_image_id)
  })
  .delete();

  const prouctImagesUsed = await db('product_images as pi')
  .join('images as i', 'pi.image_id', 'i.image_id')
  .where({
    'i.image_id': product_image.image.image_id
  })

  await db('inventory_images as ii')
  .where({
    'ii.image_id': product_image.image.image_id
  })
  .delete();

  const imageUsed = prouctImagesUsed.length > 0;
  
  if(!imageUsed){
    await db('images as i')
    .where({
      image_id: product_image.image.image_id
    })
    .delete();
  }
  
  

  return product_image;
}

module.exports = {
  findAll,
  deleteByProductImageId
}