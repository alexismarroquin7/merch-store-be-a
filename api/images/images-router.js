const router = require('express').Router();
const { validateImageExistsByImageId, validateImageNameUnique, validateImageSrcUnique, validateImageRequiredFields } = require('./images-middleware');
const Image = require('./images-model');

router.get('/', async(req, res, next) => {
  try {
    const images = await Image.findAll();
    res.status(200).json(images);
  } catch (err) {
    next(err);
  }
});

router.get('/:image_id', validateImageExistsByImageId, (req, res) => {
  res.status(200).json(req.image);
});

router.put(
  '/:image_id',
  validateImageExistsByImageId,
  validateImageRequiredFields,
  validateImageNameUnique,
  async (req, res, next) => {
    const { name, src, title, alt } = req.body;

    try {
      const updatedImage = await Image.updateByImageId(Number(req.params.image_id), { name, src, title, alt });
      res.status(200).json(updatedImage);
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