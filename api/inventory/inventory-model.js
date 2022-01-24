const db = require('../data/db-config');
const { isEmptyObject } = require('../../utils');

function findByProductId(product_id, inventoryList){
  let product = {};
  
  let colors = [];
  let sizes = [];
  let inventory_images = [];
  const visitedColorIds = new Set();
  const visitedSizeIds = new Set();
  const visitedInventoryImageIds = new Set();

  inventoryList.forEach(inventoryItem => {
    console.log(inventoryItem.color)

    if(inventoryItem.product.product_id === Number(product_id)){
      if(isEmptyObject(product)){
        product = {
          ...inventoryItem.product,
          sub_category: inventoryItem.sub_category,
          category: inventoryItem.category,
          gender: inventoryItem.gender
        };
        
        colors.push(inventoryItem.color);
        visitedColorIds.add(inventoryItem.color.color_id);
        
        sizes.push(inventoryItem.size);
        visitedSizeIds.add(inventoryItem.size.size_id);

        inventoryItem.inventory_images.forEach(inv_img => {
          inventory_images.push(inv_img);
          visitedInventoryImageIds.add(inv_img.inventory_image_id);
        })

      } else {
        if(!visitedColorIds.has(inventoryItem.color.color_id)){
          colors.push(inventoryItem.color);
          visitedColorIds.add(inventoryItem.color.color_id);
        }
        
        if(!visitedSizeIds.has(inventoryItem.size.size_id)){
          sizes.push(inventoryItem.size);
          visitedSizeIds.add(inventoryItem.size.size_id);
        }
        
        inventoryItem.inventory_images.forEach(inv_img => {
          if(!visitedInventoryImageIds.has(inv_img.inventory_image_id)){
            inventory_images.push(inv_img);
            visitedInventoryImageIds.add(inv_img.inventory_image_id);
          }
        });
        
      }


    }
  })

  return {
    ...product,
    colors,
    sizes,
    inventory_images
  }
}

function formatInventoryList(rows) {
  const visitedInventoryId = new Set();

  let inventory = [];
  
  rows.forEach(row => {
    if(!visitedInventoryId.has(row.inventory_id)){
      inventory.push({
        inventory_id: row.inventory_id,
        amount_in_stock: row.inventory_amount_in_stock,
        created_at: row.inventory_created_at,
        modified_at: row.inventory_modified_at,
        
        color: {
          color_id: row.color_id,
          name: row.color_name,
          description: row.color_description,
          created_at: row.color_created_at,
          modified_at: row.color_modified_at
        },
        product: {
          product_id: row.product_id,
          name: row.product_name,
          description: row.product_description,
          valued_at: parseFloat(row.product_valued_at),
          current_price: parseFloat(row.product_current_price),
          created_at: row.product_created_at,
          modified_at: row.product_modified_at,
        },
        size: {
          size_id: row.size_id,
          name: row.size_name,
          created_at: row.size_created_at,
          modified_at: row.size_modified_at
        },
        sub_category: {
          sub_category_id: row.sub_category_id,
          name: row.sub_category_name,
          text: row.sub_category_text,
          created_at: row.sub_category_created_at,
          modified_at: row.sub_category_modified_at,
        },
        category: {
          category_id: row.category_id,
          name: row.category_name,
          created_at: row.category_created_at,
          modified_at: row.category_modified_at,
        },
        gender: {
          gender_id: row.gender_id,
          gender_name: row.gender_name,
          gender_created_at: row.gender_created_at,
          gender_modified_at: row.gender_modified_at,
        },
        inventory_images: [
          {
            inventory_image_id: row.inventory_image_id,
            inventory_image_created_at: row.inventory_image_created_at,
            inventory_image_modified_at: row.inventory_image_modified_at,
            image: {
              image_id: row.image_id,
              image_name: row.image_name,
              image_description: row.image_description,
              image_title: row.image_title,
              image_alt: row.image_alt,
              image_src: row.image_src,
              image_created_at: row.image_created_at,
              image_modified_at: row.image_modified_at,
            }

          }
        ]
      });
    } else {
      const inventory_images_set = new Set();
      
      let inventoryIndex = null;
      
      inventory.forEach((inv_item, index) => {
        
        if(inv_item.inventory_id === row.inventory_id){
          inventoryIndex = index;
          
          inv_item.inventory_images.forEach(inv_image => {
            inventory_images_set.add(inv_image.inventory_image_id)
          });
        
        }
      })

      if(!inventory_images_set.has(row.inventory_image_id)){
        inventory[inventoryIndex].inventory_images.push({
          inventory_image_id: row.inventory_image_id,
          inventory_image_created_at: row.inventory_image_created_at,
          inventory_image_modified_at: row.inventory_image_modified_at,
          image: {
            image_id: row.image_id,
            image_name: row.image_name,
            image_description: row.image_description,
            image_title: row.image_title,
            image_alt: row.image_alt,
            image_src: row.image_src,
            image_created_at: row.image_created_at,
            image_modified_at: row.image_modified_at,
          }
        });
      }
    }

    visitedInventoryId.add(row.inventory_id)
  });

  return inventory;
}

function queryInventory(query, inventoryList) {
  if(query.product_id){
    return findByProductId(query.product_id, inventoryList);
  } else {
    return inventoryList;
  }
}

const findAll = async (query = {}) => {
  const rows = await db('inventory as inv')
  .join('sizes as s', 's.size_id', 'inv.size_id')
  .join('colors as col', 'col.color_id', 'inv.color_id')
  .join('products as p', 'p.product_id', 'inv.product_id')
  .join('sub_categories as sub_cat', 'sub_cat.sub_category_id', 'p.sub_category_id')
  .join('categories as cat', 'cat.category_id', 'sub_cat.category_id')
  .join('genders as g', 'g.gender_id', 'cat.gender_id')
  .leftJoin('inventory_images as inv_img', 'inv_img.inventory_id', 'inv.inventory_id')
  .leftJoin('images as img', 'img.image_id', 'inv_img.image_id')
  .select(
    'inv.inventory_id',
    'inv.inventory_amount_in_stock',
    'inv.inventory_created_at',
    'inv.inventory_modified_at',
    
    'col.color_id',
    'col.color_name',
    'col.color_description',
    'col.color_created_at',
    'col.color_modified_at',
    
    'p.product_id',
    'p.product_name',
    'p.product_description',
    'p.product_valued_at',
    'p.product_current_price',
    'p.product_created_at',
    'p.product_modified_at',
    
    's.size_id',
    's.size_name',
    's.size_created_at',
    's.size_modified_at',
    
    'sub_cat.sub_category_id',
    'sub_cat.sub_category_name',
    'sub_cat.sub_category_text',
    'sub_cat.sub_category_created_at',
    'sub_cat.sub_category_modified_at',
    
    'cat.category_id',
    'cat.category_name',
    'cat.category_created_at',
    'cat.category_modified_at',
    
    'g.gender_id',
    'g.gender_name',
    'g.gender_created_at',
    'g.gender_modified_at',
    
    'inv_img.inventory_image_id',
    'inv_img.inventory_image_created_at',
    'inv_img.inventory_image_modified_at',
    
    'inv_img.image_id',
    'img.image_name',
    'img.image_description',
    'img.image_title',
    'img.image_alt',
    'img.image_src',
    'img.image_created_at',
    'img.image_modified_at'
  );
  
  const result = formatInventoryList(rows);
  
  if(isEmptyObject(query)) return result;

  return queryInventory(query, result);
}

const findById = async inventory_id => {
  const inventory = await findAll();
  const filteredByInventoryId = inventory.filter(inv_item => inv_item.inventory_id === inventory_id);
  if(!filteredByInventoryId.length === 1) return null;
  return filteredByInventoryId[0];
};

module.exports = {
  findAll,
  findById
}