var http = require('http');
var express = require('express');
var app = express();
var app = require('./config/express')();
require('./config/express')(app);
require('./config/passport')();

const url = 'mongodb+srv://dougovski:1409@clusterdhaps.rzyac.mongodb.net/ifsp?retryWrites=true&w=majority';
require('./config/database.js')(url);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express Server escutando na porta ' + app.get('port'));
});
