const router = require('express').Router();
const gendersRouter = require('./genders/genders-router');

router.use('/genders', gendersRouter);

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status||500).json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;