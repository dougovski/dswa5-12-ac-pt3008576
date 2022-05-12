var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function() {

  var Usuario = mongoose.model('Usuario');
  
  passport.use(new GitHubStrategy({
  clientID: 'dswa5-11-ac-pt3008576',
  clientSecret: 'Palmeiras_2022',
  callbackURL: 'https://dswa5-11-ac-pt3008576.herokuapp.com/auth/github/callback'
   }, function(accessToken, refreshToken, profile, done) {
        Usuario.findOrCreate(
        { "login" : profile.username},
        { "nome" : profile.username},
        function(erro, usuario) {
        if(erro)
        console.log(erro);
        return done(erro);
  }
        return done(null, usuario);
      }
    );
  }));
};
