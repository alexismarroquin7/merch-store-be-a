const { isEmptyObject } = require('../../utils');
const Inventory = require('./inventory-model')
const validateInvetoryExistsByInventoryId = async (req, res, next) => {
  const { inventory_id } = req.params;
  try {
    const inventoryItem = await Inventory.findById(Number(inventory_id));
    if(inventoryItem){
      req.inventoryItem = inventoryItem;
      next()
    } else {

      next({
        message: `inventory_id ${inventory_id} does not exist`,
        status: 404
      })
    }
  } catch (err) {
    next(err);
  }
}


const handleQuery = async (req, res, next) => {
  if(isEmptyObject(req.query)){
    next();
  } else {
    if(req.query.product_id){
      try {
        const product = await Inventory.findAll(req.query);
        if(product){
          res.status(200).json(product);
        } else {
          next({
            status: 404,
            message: `product of id ${req.query.product_id} does not exist`
          })
        }
      } catch (err) {
        next(err);
      }
    } else if(req.query.groupBy) {
      if(req.query.groupBy === 'products'){
        try {
          const products = await Inventory.findAll(req.query);
          res.status(200).json(products);
        } catch (err) {
          next(err);
        } 
      } else {
        next({
          status: 400,
          message: `an invalid query parameter was provided`
        });
      }
    } else {
      next({
        status: 400,
        message: `an invalid query parameter was provided`
      });
    }

  }
}

module.exports = {
  validateInvetoryExistsByInventoryId,
  handleQuery
}