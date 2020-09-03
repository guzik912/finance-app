const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const isAuth = require('../middlewares/auth');


// router.get('/getFinancials', isAuth, userController.getFinancials);

// router.get('/getFinancial/:id', isAuth, userController.getFinancial);

router.post('/buyFinancial/:id', isAuth, userController.buyFinancial);

router.post('/rebuyFinancial/:id', isAuth, userController.rebuyFinancial);

router.delete('/sellFinancial/:id', isAuth, userController.sellFinancial);

router.post('/calcFinancialProfit/:id', isAuth, userController.calcFinancialProfit);

module.exports = router;