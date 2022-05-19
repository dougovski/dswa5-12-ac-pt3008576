var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var mongoose = require('mongoose');

module.exports = function() {

    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: '9a6541b4866641c3e086',
        clientSecret: '2040ec95f5e9c97052e283fa99c41fbda0bca214',
        callbackURL: 'https://dswa5-11-ac-pt3008576.herokuapp.com/auth/github/callback'
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
