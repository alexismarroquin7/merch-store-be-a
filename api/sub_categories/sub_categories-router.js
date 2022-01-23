const router = require('express').Router();
const SubCategory = require('./sub_categories-model');

router.get('/', async(req, res, next) => {
  try {
    const sub_categories = await SubCategory.findAll();
    res.status(200).json(sub_categories);
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