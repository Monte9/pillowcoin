const express = require('express');
const validator = require('validator');
const router = express.Router();
const passport = require('passport');

router.post('/signin', function (req, res, next) {
  let validationResult = validateSignInForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({ success: false, message: validationResult.message, errors: validationResult.errors });
  }

  passport.authenticate('local-signin', function (err, token, userData) {
    if (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        // the 11000 Mongo code is for duplicate email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({ success: false, message: "Check the form for errors.", errors: { email: "This email is already taken." } });
      } else if (err.name === "IncorrectCredentialsError") {
        return res.status(400).json({ success: false, message: err.message });
      }

      return res.status(400).json({ success: false, message: "Could not process the form." });
    }

    return res.status(200).json({ success: true, message: "You have successfully signed in!", token: token, user: userData });
  })(req, res, next);

});

/**
 * Validate the sign in form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result, errors tips, and a global message for a whole form.
 */
function validateSignInForm(payload) {
  let isFormValid = true;
  let errors = {};
  let message = '';

  if (!payload.email || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if (!payload.password || !validator.isLength(payload.password, 42)) {
    isFormValid = false;
    errors.password = "Wallet address is unvalid.";
  }

  if (!payload.name || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = "Please provide your name.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message: message,
    errors: errors
  };
}

module.exports = router;
