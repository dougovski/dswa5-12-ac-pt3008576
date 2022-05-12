var express = require('express');
var bodyParser = require('body-parser');
var load = require('express-load');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function() {
    //Instância do Express
    var app = express();

    app.use(cookieParser());
    app.use(session(
    { secret: 'dougovski',
    resave: true,
    saveUninitialized: true
    }
    ));
    app.use(passport.initialize());
    app.use(passport.session());
    
    //Porta da aplicação	
    //app.set('port', 3000);
    app.set('port', process.env.PORT || 5000);

    //Middleware
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    //Definir Engine para a View
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    //Carregar pastas
    load('models', { cwd: 'app' }).then('controllers').then('routes').into(app);

    return app;
};
