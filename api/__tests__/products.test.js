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

describe('products.test.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('[GET] /products/:product_id', () => {
  it('on SUCCESS responds with status code 200', async () => {
    const product_id = 2;
    const res = await request(server).get(`/api/products/${product_id}`);
  
    const expected = 200;

    expect(res.status).toEqual(expected);
  });
  
  it('on SUCCESS responds with product of given product_id', async () => {
    const product_id = 2;
    const res = await request(server).get(`/api/products/${product_id}`);
  
    const product = await db('products').where({ product_id }).first();
    
    const expected = product.product_id;

    expect(res.body.product_id).toEqual(expected);
  });
  
  it.only('on SUCCESS responds with product in proper format', async () => {
    const product_id = 2;
    let res = await request(server).get(`/api/products/${product_id}`);
  
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
    .where({ 'p.product_id': product_id })

    let product = {
      gender: {},
      category: {},
      sub_category: {},
      product_images: [],
      product_colors: []
    }
    
    const imageSet = new Set();
    const colorSet = new Set();
    
    rows.forEach(row => {
      if(!product.product_id){
        product.product_id = row.product_product_id;
        product.name = row.product_name;
        product.description = row.product_description;
        product.valued_at = Number(row.product_valued_at);
        product.current_price = Number(row.product_current_price);
        product.created_at = row.product_created_at;
        product.modified_at = row.product_modified_at;

        product.category = {
          category_id: row.category_id,
          name: row.category_name,
          created_at: row.category_created_at,
          modified_at: row.category_modified_at
        }
        product.sub_category = {
          sub_category_id: row.sub_category_id,
          name: row.sub_category_name,
          created_at: row.sub_category_created_at,
          modified_at: row.sub_category_modified_at
        }
        product.gender = {
          gender_id: row.gender_id,
          name: row.gender_name,
          created_at: row.gender_created_at,
          modified_at: row.gender_modified_at
        }
      }

      if(row.product_image_id !== null){
        if(!imageSet.has(row.image_id)){
          const product_image = {
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
              modified_at: row.image_modified_at,
            }
          }
  
          product.product_images.push(product_image);
          imageSet.add(row.image_id);
        }
      }
      
      if(row.product_color_id !== null){
        if(!colorSet.has(row.color_id)){
          const product_color = {
  
            product_color_id: row.product_color_id,
            created_at: row.product_color_created_at,
            modified_at: row.product_color_modified_at,
            color: {
              color_id: row.color_id,
              name: row.color_name,
              created_at: row.color_created_at,
              modified_at: row.color_modified_at,
            }
  
          }
          
          product.product_colors.push(product_color);
          colorSet.add(row.color_id);
        }
      }
    });
    
    const expected = JSON.parse(JSON.stringify(product));
    res = JSON.parse(JSON.stringify(res.body))

    console.log(res.product_colors[0], expected.product_colors[0])

    // expect(res.product_images.length).toEqual(expected.product_images.length);
    // expect(res.product.length).toEqual(expected.product_images.length);

    expect(res).toMatchObject(expected);
  });
})
