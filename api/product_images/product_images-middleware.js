const { findAll } = require("./product_images-model");

const validateProductImageExistsByProductImageId = async (req, res, next) => {
  const { product_image_id } = req.params;

  try {
    const productImages = await findAll(Number(product_image_id));
    const matchingProductImages = productImages.filter(pi => pi.product_image_id === Number(product_image_id));
    if(matchingProductImages.length !== 0){
      req.product_image = matchingProductImages[0];
      next();
    } else {
      next({
        status: 404,
        message: 'product_image does not exist'
      })
    }

  } catch (err) {
    next(err);
  }

}

module.exports = {
  validateProductImageExistsByProductImageId
}