const router = require('express').Router();
const gendersRouter = require('./genders/genders-router');
const categoriesRouter = require('./categories/categories-router');
const sub_categoriesRouter = require('./sub_categories/sub_categories-router');
const imagesRouter = require('./images/images-router');
const productsRouter = require('./products/products-router');
const productImagesRouter = require('./product_images/product_images-router');
const inventoryRouter = require('./inventory/inventory-router');
const authRouter = require('./auth/auth-router');
const inventoryImagesRouter = require('./inventory_images/inventory_images-router');

router.use('/genders', gendersRouter);
router.use('/categories', categoriesRouter);
router.use('/sub_categories', sub_categoriesRouter);
router.use('/images', imagesRouter);
router.use('/products', productsRouter);
router.use('/inventory', inventoryRouter);
router.use('/auth', authRouter);
router.use('/product_images', productImagesRouter);
router.use('/inventory_images', inventoryImagesRouter);

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status||500).json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;