const router = require('express').Router();
const { validateInvetoryExistsByInventoryId } = require('./inventory-middleware');
const Inventory = require('./inventory-model');

router.get('/', async(req, res, next) => {
  try {
    const inventory = await Inventory.findAll(req.query);
    res.status(200).json(inventory);
  } catch (err) {
    next(err);
  }
});

router.get('/:inventory_id', validateInvetoryExistsByInventoryId, async(req, res) => {
  res.status(200).json(req.inventoryItem);
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status||500).json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;