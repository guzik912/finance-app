const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const isAuth = require('../middlewares/auth');


router.post('/buyFinancial/:id', isAuth, userController.buyFinancial);

router.post('/rebuyFinancial/:id', isAuth, userController.rebuyFinancial);

router.delete('/sellFinancial/:id', isAuth, userController.sellFinancial);

router.post('/calcFinancialInvestments/:id', isAuth, userController.calcFinancialInvestments);

router.post('/applyForCredit/:id', isAuth, userController.applyForCredit);

router.get('/payOffCredit/:id', isAuth, userController.payOffCredit);

router.post('/updateWallet', isAuth, userController.updateWallet);

router.post('/payInCash', isAuth, userController.payInCash);

router.post('/payOutCash', isAuth, userController.payOutCash);

router.post('/setPersonalData', isAuth, userController.setPersonalData);

router.delete('/deleteMailbox', isAuth, userController.deleteMessages);

router.delete('/deleteMailboxMessage/:id', isAuth, userController.deleteMessage);


module.exports = router;