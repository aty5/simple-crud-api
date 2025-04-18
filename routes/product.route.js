const express = require('express');
const router = express.Router();
const {getProducts, getProduct, postProduct, updateProduct, deleteProduct} = require('../controllers/product.controller.js');
const auth = require('../middleware/auth.middleware');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', auth, postProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;