// first migration
const genders = require('./genders')
const categories = require('./categories')
const sub_categories = require('./sub_categories')
const images = require('./images')

// second migration
const products = require('./products')
const product_images = require('./product_images')
const sizes = require('./sizes')
const colors = require('./colors')
const inventory = require('./inventory')
const inventory_images = require('./inventory_images')
const product_colors = require('./product_colors')

// third migration
const roles = require('./roles')
const users = require('./users')

module.exports = {
  genders,
  categories,
  sub_categories,
  images,
  
  products,
  product_images,
  sizes,
  colors,
  inventory,
  inventory_images,
  product_colors,

  roles,
  users
}