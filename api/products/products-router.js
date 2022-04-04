const router = require('express').Router();
const Product = require('./products-model');

router.get('/', async(req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

/*

  [ ] validate product required fields
    [ ] name
      [ ] type === 'string'
    
    [ ] description
      [ ] type === 'string'
      
    [ ] colors
      [ ] type === 'array'
      [ ] color: 
        {
          name: '',
          alt: '',
          title: '',
          src: ''
        }
    
    [ ] images
      [ ] type === 'array'
      [ ] image: 
        {
          name: '',
          alt: '',
          title: '',
          src: ''
        }
      
    [ ] gender
      [ ] type === 'string'
      [ ] gender:
        {
          name: ''
        }
      
      [ ] category
        {
          name: ''
        }
      
      [ ] type === 'string'
      
    [ ] sub_category
      [ ] type === 'string'
      
  
  [ ] validate product name unique fields
  [ ] 

*/

router.put('/', async(req, res, next) => {

});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status||500).json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;