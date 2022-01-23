const router = require('express').Router();
const Gender = require('./genders-model');

router.get('/', async(req, res, next) => {
  try {
    const genders = await Gender.findAll();
    res.status(200).json(genders);
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