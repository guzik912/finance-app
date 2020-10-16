const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { sendGridURI } = require('../config/url');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: sendGridURI,
    },
  })
);

exports.authUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate([{
        path: 'financials financialsHistory',
        populate: {
          path: 'financial',
        },
      },
      {
        path: 'credits creditsHistory',
        populate: {
          path: 'credit',
        },
      },
    ]);
    res.json(user);
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

exports.registration = async (req, res) => {
  const { username, email, password } = req.body;
  let accountConfirmToken;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'Problem with generate random token' }] });
    }
    accountConfirmToken = buffer.toString('hex');
  });

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'Account with that email already exists' }] });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user = new User({
      username,
      email,
      password: hashedPassword,
      accountConfirmToken,
    });

    await user.save();
    transporter.sendMail({
      to: email,
      from: 'finance.world@t.pl',
      subject: 'Confirmation account',
      html: `<h1>Welcome in Finance World ${username}</h1>
            <p>Your registration was successfully. One more step before manage your application, please confirm your registration, by click link below</p>
            <a href="http://localhost:3000/confirmAccount/${accountConfirmToken}">Confirm account</a>
          `,
    });

    return res.status(201).json({
      msg: 'User successfully registered!',
    });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

exports.confirmAccount = async (req, res) => {
  const accountConfirmToken = req.params.accountConfirmToken;

  try {
    const user = await User.findOne({ accountConfirmToken: accountConfirmToken });

    if (!user) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'Problem with authenticate account' }] });
    }

    user.accountConfirmStatus = true;
    user.accountConfirmToken = undefined;
    await user.save();
    return res.status(201).json({ msg: 'Account successfully confirmed' });

  } catch (err) {
    return res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'Account not exist with that email' }] });
    }

    const isEqualPassword = await bcrypt.compare(password, user.password);

    if (!isEqualPassword) {
      res.status(401).json({ errors: [{ msg: 'Wrong password' }] });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = jwt.sign(payload, 'supersecrettoken', { expiresIn: '1h' });

    return res.status(200).json({ token, msg: 'User logged successfully' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    await User.findOneAndRemove({ _id: req.user.id });

    return res.status(201).json({ msg: 'User account deleted' });
  } catch (err) {
    return res.status(500).json({ errors: 'Server error' });
  }
};

exports.postResetPassword = async (req, res) => {
  const { email } = req.body;
  let resetToken;

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      res
        .status(401)
        .json({ errors: [{ msg: 'Problem with generate random token' }] });
      return res.redirect('/resetPassword');
    }
    resetToken = buffer.toString('hex');
  });

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res
        .status(401)
        .json({ errors: [{ msg: 'Account not exist with that email' }] });
      return res.redirect('/resetPassword');
    }

    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000;

    await user.save();
    transporter.sendMail({
      to: email,
      from: 'finance.world@t.pl',
      subject: 'Reset password',
      html: `
        <h1>Forgot password? 
        <p>Dont worry ${user.username}, you can set up your new password by click link below.</p>
        <a href="http://localhost:3000/resetPassword/${resetToken}">Reset password</a>
      `,
    });

    return res.status(201).json({
      msg: 'Reset instruction was sent to your email address',
    });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

exports.getResetPassword = async (req, res) => {
  const resetToken = req.params.token;

  try {
    const user = await User.findOne({
      resetToken,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({ errors: [{ msg: 'No user authorized' }] });
    }

    const authenticatedUser = {
      userId: user._id.toString(),
      resetToken,
    };

    return res.status(200).json({
      msg: 'User reset token authorized',
      user: authenticatedUser,
    });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

exports.postNewPassword = async (req, res) => {
  const { newPassword, userId, resetToken } = req.body;

  try {
    const user = await User.findOne({
      _id: userId,
      resetToken: resetToken,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({ errors: [{ msg: 'No user authorized' }] });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save();

    return res.status(201).json({ msg: 'Password successfully changed' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

exports.showUsers = async (req, res) => {
  try {
    const users = await User.find().populate([
      {
        path: 'financials financialsHistory',
        populate: {
          path: 'financial',
        },
      },
      {
        path: 'credits creditsHistory',
        populate: {
          path: 'credit',
        },
      },
    ]);

    if (!users) {
      return res.status(401).json({ errors: [{ msg: 'No any user exist' }] });
    }

    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};
