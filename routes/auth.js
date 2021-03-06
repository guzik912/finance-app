const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth');
const isAuth = require('../middlewares/auth');


router.get('/', isAuth, authController.authUser);

router.post(
  '/registration',
  [
    body('username')
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage('Username is too short'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password is too short'),
  ],
  authController.registration
);

router.post('/login', authController.login);

router.get('/confirmAccount/:accountConfirmToken', authController.confirmAccount);

router.delete('/delete', isAuth, authController.deleteAccount);

router.post('/postResetPassword', authController.postResetPassword);

router.get('/getResetPassword/:token', authController.getResetPassword);

router.post('/newPassword', authController.postNewPassword);

router.get('/showUsers', authController.showUsers);

module.exports = router;
