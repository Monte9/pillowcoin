const express = require('express');
const router = express.Router();

const generatePassword = require('password-generator');

router.get('/passwords', function (req, res, next) {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

module.exports = router;
