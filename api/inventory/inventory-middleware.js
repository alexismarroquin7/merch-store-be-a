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

module.exports = {
  validateInvetoryExistsByInventoryId
}