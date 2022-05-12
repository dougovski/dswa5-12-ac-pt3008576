var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

module.exports = function() {

  passport.use(new GitHubStrategy({
  clientID: 'dswa5-11-ac-pt3008576',
  clientSecret: 'Palmeiras_2022',
  callbackURL: 'https://dswa5-11-ac-pt3008576.herokuapp.com/auth/github/callback'
   }, function(accessToken, refreshToken, profile, done) {
    }));
  };
