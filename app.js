const path = require('path');
const express = require('express');
const connectdb = require('./db/db');

// connect to database
connectdb();

// initialize express app
const app = express();

// body parser
app.use(express.json());

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// static files
app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'images')));

// routes
app.use('/', require('./routes/index'));

// run application
app.listen(3000, () => console.log('listening on port 3000...'));