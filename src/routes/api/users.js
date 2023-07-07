const UserController = require('../../controllers/users.controller');

const router = require('express').Router();

router.get('/', UserController.getAll)


router.post('/register', UserController.createUser);
// 将用户买的产品添加到用户的表格下
router.put('/:userId/buy/:productId', UserController.buyProduct)

module.exports = router;