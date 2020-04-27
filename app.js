const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const connectdb = require('./db/db');

// connect to database
connectdb();

// initialize express app
const app = express();

// static files
app.use(express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public/images')));

// view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// routes
app.use('/', require('./routes/index'));

// run application
app.listen(3000, () => console.log('listening on port 3000...'));
