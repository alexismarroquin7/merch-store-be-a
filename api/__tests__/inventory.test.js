const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('inventory.test.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('[GET] /api/inventory/:inventory_id', () => {
  it('on SUCCESS responds with status code 200', async () => {
    const inventory_id = 1;
    const res = await request(server).get(`/api/inventory/${inventory_id}`);
    expect(res.status).toEqual(200);
  });
  
  it('on SUCCESS responds with inventory of given inventory_id', async () => {

    const inventory_id = 2;
    const res = await request(server).get(`/api/inventory/${inventory_id}`);
    
    const inventory = await db('inventory as i')
    .where({
      'i.inventory_id': inventory_id
    })
    .first();

    expect(res.body.inventory_id).toEqual(inventory.inventory_id);
  });

  it('on SUCCESS responds with inventory in proper format', async () => {

    const inventory_id = 2;
    let res = await request(server).get(`/api/inventory/${inventory_id}`);
    
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
    )
    .where({
      'inv.inventory_id': inventory_id
    });

    let inventory = {
      gender: {},
      category: {},
      sub_category: {},
      size: {},
      product: {},
      color: {},
      inventory_images: []
    };

    rows.forEach(row => {
      if(!inventory.inventory_id){
        inventory.inventory_id = row.inventory_id;
        inventory.amount_in_stock = row.inventory_amount_in_stock;
        inventory.created_at = row.inventory_created_at;
        inventory.modified_at = row.inventory_modified_at;
        inventory.color = {
          color_id: row.color_id,
          name: row.color_name,
          description: row.color_description,
          created_at: row.color_created_at,
          modified_at: row.color_modified_at
        }
        inventory.product = {
          product_id: row.product_id,
          name: row.product_name,
          description: row.product_description,
          valued_at: Number(row.product_valued_at),
          current_price: Number(row.product_current_price),
          created_at: row.product_created_at,
          modified_at: row.product_modified_at
        }
        inventory.size = {
          size_id: row.size_id,
          name: row.size_name,
          created_at: row.size_created_at,
          modified_at: row.size_modified_at
        }
        inventory.sub_category = {
          sub_category_id: row.sub_category_id,
          name: row.sub_category_name,
          created_at: row.sub_category_created_at,
          modified_at: row.sub_category_modified_at,
        }
        inventory.category = {
          category_id: row.category_id,
          name: row.category_name,
          created_at: row.category_created_at,
          modified_at: row.category_modified_at,
        }
        inventory.gender = {
          gender_id: row.gender_id,
          name: row.gender_name,
          created_at: row.gender_created_at,
          modified_at: row.gender_modified_at,
        }      
      }
      
      if(row.inventory_image_id !== null){
        const inventory_image = {
          inventory_image_id: row.inventory_image_id,
          created_at: row.inventory_image_created_at,
          modified_at: row.inventory_image_modified_at,
          image: {
            image_id: row.image_id,
            name: row.image_name,
            description: row.image_description,
            title: row.image_title,
            alt: row.image_alt,
            src: row.image_src,
            created_at: row.image_created_at,
            modified_at: row.image_modified_at,
          }
        }
  
        inventory.inventory_images.push(inventory_image)

      }

    });

    res = JSON.parse(JSON.stringify(res.body));
    inventory = JSON.parse(JSON.stringify(inventory));

    expect(res).toEqual(inventory);
  });

  it('on FAIL due to inventory does not exist responds with status code 404', async () => {
    const inventory_id = 1000000000000;
    const res = await request(server).get(`/api/inventory/${inventory_id}`);

    const expected = 404;

    expect(res.status).toEqual(expected);
  })
  
  it('on FAIL due to inventory does not exist responds with proper message', async () => {
    const inventory_id = 1000000000000;
    const res = await request(server).get(`/api/inventory/${inventory_id}`);

    const expected = {
      message: `inventory_id ${inventory_id} does not exist`
    }

    expect(res.body).toMatchObject(expected);
  });

  
});