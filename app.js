const path = require('path');
const express = require('express');
const connectdb = require('./db/db');
const { Location, Member } = require('./db/models');

//--- connect to database
connectdb();

const app = express();

//--- middleware
app.use(express.json()); // body parser
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'scripts')));
// app.locals not needed when NODE_ENV is set properly (production: compileDebug = false, cache = true)
app.locals.compileDebug = true; // for development only
app.locals.cache = false;

//--- routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Team Alpha Alumni | Home' });
});

app.get('/map', async (req, res) => {
  try {
    const members = await Member.find();
    // res.status(200).json({
    //   success: true,
    //   count: members.length,
    //   data: members
    // });
    res.render('map', { title: 'Team Alpha Alumni | Map', members: JSON.stringify(members) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

//--- run application
app.listen(3000, () => {
  console.log('listening on port 3000...');
});