const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')
const { categories } = require('../data/seed-data');

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

describe('categories.test.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  });

  describe('[GET] /api/categories', () => {
    it('on SUCCESS responds with status code 200', async () => {
      const res = await request(server).get('/api/categories');
      expect(res.status).toEqual(200);
    });
    
    it('on SUCCESS responds with all categories', async () => {
      const res = await request(server).get('/api/categories');
      expect(res.body.length).toEqual(categories.length);
    });
    
    it('on SUCCESS responds categories in correct format', async () => {
      let res = await request(server).get('/api/categories');
      
      const category = await db('categories as c')
      .join('genders as g', 'g.gender_id', 'c.gender_id')
      .first();

      let expected = {
        category_id: category.category_id,
        name: category.category_name,
        created_at: category.category_created_at,
        modified_at: category.category_modified_at,
        gender: {
          gender_id: category.gender_id,
          name: category.gender_name,
          created_at: category.gender_created_at,
          modified_at: category.gender_modified_at,
        }
      }

      res = JSON.parse(JSON.stringify(res.body[0]));
      expected = JSON.parse(JSON.stringify(expected));

      expect(res).toMatchObject(expected);

    });

  });
});
