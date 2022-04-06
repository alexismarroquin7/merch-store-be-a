const router = require('express').Router();

const {
  validateInventoryImageExistsByInventoryImageId,
  validateInventoryExistsByInventoryId,
  validateImageExistsByImageId,
  validateNewInventoryImageRequiredFields
} = require('./inventory_images-middleware');

const { 
  findAll,
  deleteByInventoryImageId,
  create
} = require('./inventory_images-model');

router.get('/', async (req, res, next) => {
  try {
    const inventory_images = await findAll();
    res.status(200).json(inventory_images);
  } catch (err) {
    next(err);
  }
});

router.get('/:inventory_image_id', validateInventoryImageExistsByInventoryImageId, (req, res) => {
  res.status(200).json(req.inventory_image);
})

router.post(
  '/',
  validateImageExistsByImageId,
  validateInventoryExistsByInventoryId,
  validateNewInventoryImageRequiredFields,
  async (req, res, next) => {  
  const { inventory_id, image_id } = req.body;

  try {
    const inventory_image = await create({ inventory_id, image_id });
    res.status(201).json(inventory_image);
  } catch (err) {
    next(err);
}
})

router.delete('/:inventory_image_id', validateInventoryImageExistsByInventoryImageId, async (req, res, next) => {
  try {
    const deletedInventoryImage = await deleteByInventoryImageId(Number(req.params.inventory_image_id));
    res.status(200).json({
      inventory_image_id: deletedInventoryImage.inventory_image_id
    });
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status||500).json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;