const express = require('express');
const router = express.Router();
const financialController = require('../controllers/financial');
const isAuth = require('../middlewares/auth');

router.post('/createFinancial', isAuth, financialController.createFinancial);

router.get('/getFinancials', isAuth, financialController.getFinancials);

router.get('/getFinancial/:id', isAuth, financialController.getFinancial);

router.put('/updateFinancials', isAuth, financialController.updateFinancials);


module.exports = router;