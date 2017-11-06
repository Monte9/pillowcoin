const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/dashboard', function (req, res, next) {
  // Use the User model to find one user with this email
  User.findOne({ "email": req.body.email }, function (err, user) {
    if (err) {
      res.status(200).json({
        message: `You are authorized to be here!`,
        error: err,
        success: true
      });
    } else if (!user) {
      res.status(200).json({
        message: `You are authorized to be here!`,
        error: "",
        success: true
      });
    } else {
      res.status(200).json({
        message: `You are authorized to be here!`,
        error: '',
        user,
        success: true
      });
    }
  });
});

module.exports = router;
