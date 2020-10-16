const express = require('express');
const router = express.Router();
const creditController = require('../controllers/credit');
const isAuth = require('../middlewares/auth');

router.post('/createCredit', isAuth, creditController.createCredit);

router.get('/getCredits', isAuth, creditController.getCredits);

router.get('/getCredit/:id', isAuth, creditController.getCredit);

router.get('/considerCredit', isAuth, creditController.considerCredit);

router.get('/responseCreditMail', isAuth, creditController.responseCreditMail);

module.exports = router;