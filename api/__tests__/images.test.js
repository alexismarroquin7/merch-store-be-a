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

describe('images.test.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('[GET] /image/:image_id', () => {
  it('responds with image in proper format', async () => {
    const image_id = 2;
    let res = await request(server).get(`/api/images/${image_id}`);

    const image = await db('images as i')
    .where({ image_id })
    .select(
      'i.image_id',
      'i.image_src as src',
      'i.image_alt as alt',
      'i.image_name as name',
      'i.image_title as title',
      'i.image_modified_at as modified_at',
      'i.image_created_at as created_at'
    )
    .first();

    res = JSON.parse(JSON.stringify(res.body))
    const expected = JSON.parse(JSON.stringify(image));

    expect(res).toMatchObject(expected);
  })
});