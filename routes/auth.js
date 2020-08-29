const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth');
const isAuth = require('../middlewares/auth');

router.post(
  '/signup',
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
  authController.signup
);

router.post('/signin', authController.signin);

router.get('/confirmAccount/:accountConfirmToken', authController.confirmAccount);

router.delete('/delete', isAuth, authController.deleteAccount);

router.post('/resetPassword', authController.postResetPassword);

router.get('/resetPassword/:token', authController.getResetPassword);

router.post('/newPassword', authController.postNewPassword)

module.exports = router;
