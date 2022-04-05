const { findByProductId } = require("./products-model");

const validateProductRequiredFields = (req, res, next) => {
  
  const { 
    name,
    valued_at,
    current_price,
    gender,
    category,
    sub_category,
    colors,
    images
  } = req.body;
  
  if(!name){
    next({
      status: 400,
      message: 'product name is a required field'
    });
  } else if(!valued_at){
    next({
      status: 400,
      message: 'product valued_at is a required field'
    });
  } else if(!current_price){
    next({
      status: 400,
      message: 'product current_price is a required field'
    });
    
  } else if(!gender || !gender.name){
    next({
      status: 400,
      message: 'product gender name is a required field'
    });

  } else if(!category || !category.name){
    next({
      status: 400,
      message: 'product gender name is a required field'
    });

  
  } else if(!sub_category || !sub_category.name){
    next({
      status: 400,
      message: 'product gender name is a required field'
    });

  } else if(!Array.isArray(colors)){
    next({
      status: 400,
      message: 'product colors is a required field'
    });
    
  } else if(!Array.isArray(images)){
    next({
      status: 400,
      message: 'product images is a required field'
    });

  } else {
    next();
  }
}

const validateProductExistsByProductId = async (req, res, next) => {
  const { product_id } = req.params;

  try {
    const product = await findByProductId(Number(product_id));
    if(product){
      req.product = product;
      next();
    } else {
      next({
        status: 404,
        message: `product does not exist`
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateProductRequiredFields,
  validateProductExistsByProductId
}