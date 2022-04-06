const router = require('express').Router();
const { validateProductExistsByProductId, validateProductRequiredFields, validateProductNameUnique } = require('./products-middleware');
const Product = require('./products-model');

router.get('/', async(req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:product_id', validateProductExistsByProductId, (req, res) => {
  res.status(200).json(req.product)
})

router.put(
  '/:product_id',
  validateProductExistsByProductId,
  validateProductRequiredFields,
  validateProductNameUnique,
  async (req, res, next) => {
    const { product_id } = req.params;
    try {
      const product = await Product.updateByProductId(product_id, req.body);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status||500).json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;