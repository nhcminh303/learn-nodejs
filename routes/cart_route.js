const express = require('express');
const router = express.Router();

const controller = require('../controllers/cart_controller');

router.get('/add/:productId', controller.addToCart);

module.exports = router;