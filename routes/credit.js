const express = require('express');
const router = express.Router();
const creditController = require('../controllers/credit');
const isAuth = require('../middlewares/auth');

router.post('/createCredit', isAuth, creditController.createCredit);
router.get('/getCredits', isAuth, creditController.getCredits);
router.get('/getCredit/:id', isAuth, creditController.getCredit);
router.get('/acceptCredit', isAuth, creditController.acceptCredit);
router.get('/rejectCredit', isAuth, creditController.rejectCredit);
router.get('/creditResponseMail', isAuth, creditController.creditResponseMail);

module.exports = router;