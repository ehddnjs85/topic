const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const port = 'ehddnjs85.github.io/topic/';

const app = express();

// BodyParser
app.use(bodyParser.urlencoded({extended : false}));

// View engine setup (ejs)
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

// ejs-layout setting
app.set('layout', './partials/layout');
app.set("layout extractScripts", true);
app.use(expressLayouts);

// Bootstrap & Jquery
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Topic Route
let topic = require('./app/routes/topic')();
app.use('/', topic);

// 포트접속
app.listen(port, function() {
    console.log('Conneted ' + port + ' port!!');
});

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
}).listen(80, 'https://ehddnjs85.github.io/topic/');
console.log('Server running at https://ehddnjs85.github.io/topic/');

