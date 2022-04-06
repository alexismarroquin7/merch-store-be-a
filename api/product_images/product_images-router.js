const { findAll, deleteByProductImageId } = require('./product_images-model');
const { validateProductImageExistsByProductImageId } = require('./product_images-middleware')
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const product_images = await findAll();
    res.status(200).json(product_images);
  } catch (err) {
    next(err);
  }
});

router.delete(
  '/:product_image_id', 
  validateProductImageExistsByProductImageId,
  async (req, res, next) => {
    try {
      const product_images = await deleteByProductImageId(Number(req.params.product_image_id));
      res.status(200).json(product_images);
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