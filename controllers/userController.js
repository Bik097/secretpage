/* eslint-disable linebreak-style */
const passport = require('passport');
const User = require('../models/User');

exports.home = (req, res) => {
  res.render('index', {
    user: req.user,
  });
};

exports.registerForm = (req, res) => {
  res.render('register', {
    title: 'Register',
    warning: '',
    user: req.user,
  });
};

exports.register = (req, res, next) => {
  const user = new User({ username: req.body.username });

  User.register(user, req.body.password, (err, account) => {
    if (err) {
      // needed to say 'return' below otherwise node will complain that headers already sent.
      return res.render('register', {
        title: 'Register',
        warning: 'Sorry, that username is already taken.  Try again.',
        user: req.user,
      });
    }
    res.redirect('/'); /* success */
  });
};

exports.loginForm = (req, res) => {
  const messages = req.session.messages || [];

  // clear session message
  req.session.messages = [];

  res.render('login', {
    title: 'Login',
    messages,
    user: req.user,
  });
};
