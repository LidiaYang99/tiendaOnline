const productsController = require('../../controllers/products.controller')

const router = require('express').Router();

router.get('/', productsController.getProducts);
router.get('/:productId', productsController.getById);
router.put('/:productId', productsController.findByIdAndUpdate1)

router.post('/', productsController.postProducts)
router.delete('/:productId', productsController.remove)


module.exports = router;