const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'images')));
app.locals.compileDebug = true; // for development only
app.locals.cache = false;

// routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Team Alpha Alumni | Home' });
});

// run application
app.listen(3000, () => {
  console.log('listening on port 3000...');
});