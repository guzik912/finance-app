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

router.post('/applyForCredit/:id', isAuth, userController.applyForCredit);

router.get('/payOffCredit/:id', isAuth, userController.payOffCredit);

router.post('/updateWallet', isAuth, userController.updateWallet);

router.post('/payInCash', isAuth, userController.payInCash);

router.post('/payOutCash', isAuth, userController.payOutCash);

router.post('/setPersonalData', isAuth, userController.setPersonalData);


module.exports = router;