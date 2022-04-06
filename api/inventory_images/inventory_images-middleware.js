const InventoryImage = require('./inventory_images-model');
const Inventory = require('../inventory/inventory-model');
const Image = require('../images/images-model');

const validateInventoryImageExistsByInventoryImageId = async (req, res, next) => {
  const { inventory_image_id } = req.params;

  try {
    const inventory_image = await InventoryImage.findById(Number(inventory_image_id));
    if(inventory_image) {
      req.inventory_image = inventory_image;
      next();
    } else {
      next({
        status: 404,
        message: 'inventory_image does not exist'
      });
    }
  } catch (err) {
    next(err);
  }
}


const validateImageExistsByImageId = async (req, res, next) => {
  const { image_id } = req.body;

  try {
    const image = await Image.findById(Number(image_id));
    if(image){
      next();
    } else {
      next({
        status: 404,
        message: 'image does not exist'
      })
    }
  } catch (err) {
    next(err);
  }
}

const validateInventoryExistsByInventoryId = async (req, res, next) => {
  const { inventory_id } = req.body;

  try {
    const inventory = await Inventory.findById(Number(inventory_id));
    if(inventory){
      next();
    } else {
      next({
        status: 404,
        message: 'inventory does not exist'
      })
    }
  } catch (err) {
    next(err);
  }
}

const validateNewInventoryImageRequiredFields = async (req, res, next) => {
  const { inventory_id, image_id } = req.body;

  if(!inventory_id || !image_id){
    next({
      status: 400,
      message: 'inventory_id and image_id are required'
    })
  } else {
    next();
  }
}

module.exports = {
  validateInventoryImageExistsByInventoryImageId,
  validateImageExistsByImageId,
  validateInventoryExistsByInventoryId,
  validateNewInventoryImageRequiredFields
}