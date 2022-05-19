var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var mongoose = require('mongoose');

module.exports = function() {
    var usuario = mongoose.model('usuario');
    
    passport.use(new GitHubStrategy({
        clientID: 'dswa5-11-ac-pt3008576',
        clientSecret: 'Palmeiras_2022',
        callbackURL: 'https://dswa5-11-ac-pt3008576.herokuapp.com/auth/github/callback'
        }, function(accessToken, refreshToken, profile, done) {
            usuario.findOrCreate(
                { "login" : profile.username},
                { "nome" : profile.username},
                function(erro, usuario) {
                    if(erro){
                        console.log(erro);
                        return done(erro);
                    }
                    return done(null, usuario);
                }
            );
        }
    ));

    passport.serializeUser(function(usuario, done) {
        done(null, usuario._id);
    });
            
    passport.deserializeUser(function(id, done) {
        usuario.findById(id).exec().then(function(usuario) {
            done(null, usuario);
        });
    });
};
