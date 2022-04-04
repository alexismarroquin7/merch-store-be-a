const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('products as p')
  .leftJoin('product_images as p_img', 'p_img.product_id', 'p.product_id')
  .leftJoin('images as img', 'p_img.image_id', 'img.image_id')
  .leftJoin('sub_categories as sub_cat', 'sub_cat.sub_category_id', 'p.sub_category_id')
  .leftJoin('categories as cat', 'cat.category_id', 'sub_cat.category_id')
  .leftJoin('genders as g', 'g.gender_id', 'cat.gender_id')
  .leftJoin('product_colors as p_col', 'p_col.product_id', 'p.product_id')
  .leftJoin('colors as col', 'col.color_id', 'p_col.color_id')
  .select(
    'p.product_id',
    'p.product_name',
    'p.product_description',
    'p.product_valued_at',
    'p.product_current_price',
    'p.product_created_at',
    'p.product_modified_at',
    
    'p.sub_category_id',
    'sub_cat.sub_category_name',
    'sub_cat.sub_category_created_at',
    'sub_cat.sub_category_modified_at',
    
    'p_img.product_image_id',
    'p_img.product_image_created_at',
    'p_img.product_image_modified_at',
    
    'img.image_id',
    'img.image_name',
    'img.image_description',
    'img.image_title',
    'img.image_alt',
    'img.image_src',
    'img.image_created_at',
    'img.image_modified_at',
    
    'cat.category_id',
    'cat.category_name',
    'cat.category_created_at',
    'cat.category_modified_at',
    
    'g.gender_id',
    'g.gender_name',
    'g.gender_created_at',
    'g.gender_modified_at',
    
    'p_col.product_color_id',
    'p_col.product_color_created_at',
    'p_col.product_color_modified_at',
    
    'p_col.color_id',
    'col.color_name',
    'col.color_created_at',
    'col.color_modified_at',
  )
  
  const visitedProductIds = new Set();

  let products = [];
  
  rows.forEach(row => {
    if(!visitedProductIds.has(row.product_id)){
      products.push({
        product_id: row.product_id,
        name: row.product_name,
        description: row.product_description,
        valued_at: parseFloat(row.product_valued_at),
        current_price: parseFloat(row.product_current_price),
        created_at: row.product_created_at,
        modified_at: row.product_modified_at,
        sub_category: {
          sub_category_id: row.sub_category_id,
          name: row.sub_category_name,
          created_at: row.sub_category_created_at,
          modified_at: row.sub_category_modified_at,
        },
        product_images: [
          {
            product_image_id: row.product_image_id,
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
        ],
        product_colors: [
          {
            product_color_id: row.product_color_id,
            created_at: row.product_color_created_at,
            modified_at: row.product_color_modified_at,
            
            color: {
              color_id: row.color_id,
              name: row.color_name,
              created_at: row.color_created_at,
              modified_at: row.color_modified_at
            }
          }
        ],
        category: {
          category_id: row.category_id,
          name: row.category_name,
          created_at: row.category_created_at,
          modified_at: row.category_modified_at,
        },
        gender: {
          gender_id: row.gender_id,
          name: row.gender_name,
          created_at: row.gender_created_at,
          modified_at: row.gender_modified_at
        }
      });

      visitedProductIds.add(row.product_id);
    } else {

      const product_images_set = new Set();
      const product_colors_set = new Set();
      
      let productIndex = null;

      products.forEach((product, index) => {
        if(product.product_id === row.product_id){
          productIndex = index;

          product.product_images.forEach(product_image => {
            product_images_set.add(product_image.product_image_id);
          });
          
          product.product_colors.forEach(product_color => {
            product_colors_set.add(product_color.product_color_id);
          });

        }
        
      });
      
      if(!product_images_set.has(row.product_image_id)){
        products[productIndex].product_images.push({
          product_image_id: row.product_image_id,
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
        });
        product_images_set.add(row.product_image_id);
      }
      
      if(!product_colors_set.has(row.product_color_id)){
        products[productIndex].product_colors.push({
        
          product_color_id: row.product_color_id,
          created_at: row.product_color_created_at,
          modified_at: row.product_color_modified_at,
          
          color: {
            color_id: row.color_id,
            name: row.color_name,
            created_at: row.color_created_at,
            modified_at: row.color_modified_at
          }
        
        });
        product_colors_set.add(row.product_color_id);
      }
    }
  });

  return products;
  
}

module.exports = {
  findAll
}