const router = require('express').Router();
const Image = require('./images-model');

router.get('/', async(req, res, next) => {
  try {
    const images = await Image.findAll();
    res.status(200).json(images);
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