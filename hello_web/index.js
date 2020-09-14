const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const favicon = require('serve-favicon');
const errorhandler = require('errorhandler');
const routes = require('./routes');

const { 
    port
} = require('./config');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('combined'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorhandler())
}

app.use('/', routes);

http
    .createServer(app)
    .listen(port, () => {
        console.info(`Express server listening on port ${port}.`);
    })