const router = require('express').Router();
const gendersRouter = require('./genders/genders-router');
const categoriesRouter = require('./categories/categories-router');
const sub_categoriesRouter = require('./sub_categories/sub_categories-router');
const imagesRouter = require('./images/images-router');

router.use('/genders', gendersRouter);
router.use('/categories', categoriesRouter);
router.use('/sub_categories', sub_categoriesRouter);
router.use('/images', imagesRouter);

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status||500).json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;