const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const path = require('path');

const app = express();

// serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));

// pass the passport middleware
app.use(passport.initialize());

// load models
require('./server/models')(config);
// load passport strategies
require('./server/passport')(config);

// public API
const publicAPIRoutes = require('./server/routes/public_api');
app.use('/public_api', publicAPIRoutes);

// pass the authorization checker middleware
const authCheckMiddleware = require('./server/middlewares/auth-check')(config);
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// start the server
app.listen(process.env.PORT || 5000, function () {
  console.log(`pillowcoin is listening on http://localhost:5000 or https://pillowcoin.herokuapp.com/`);
});
