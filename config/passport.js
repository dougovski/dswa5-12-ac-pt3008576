var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var mongoose = require('mongoose');

module.exports = function() {

    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: '854aaaa1e4604c700f40',
        clientSecret: '2a308dd3da8b0b4e6fa24bac4ed74585f80356f5',
        callbackURL: 'https://dswa5-12-ac-pt3008576.herokuapp.com/auth/github/callback'
        }, function(accessToken, refreshToken, profile, done) {
                Usuario.findOrCreate(
                    { "login" : profile.username},
                    { "nome" : profile.username},
                    function(erro, usuario){
                        if(erro){
                            console.log(erro);
                            return done(erro);
                        }
                        return done(null, usuario);
                    }
                )
        }));

    passport.serializeUser(function(usuario, done) {
        done(null, usuario._id);
    });

    passport.deserializeUser(function(id, done) {
        Usuario.findById(id).exec()
        .then(function(usuario) {
                done(null, usuario);
            });
        });
};
