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
// app.locals not needed when NODE_ENV is set properly (production: compileDebug = false, cache = true)
app.locals.compileDebug = true; // for development only
app.locals.cache = false;

//--- routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Team Alpha Alumni | Home' });
});

app.get('/map', async (req, res) => {
  const geojson = {
    type: 'FeatureCollection',
    features: []
  };

  try {
    const members = await Member.find().populate('location');
    members.forEach(member => {
      const memberObj = member.toObject();
      geojson.features.push({
        type: 'Feature',
        properties: {
          name: `${memberObj.first_name} ${memberObj.last_name}`
        },
        geometry: {
          type: 'Point',
          coordinates: [memberObj.location.longitude, memberObj.location.latitude]
        }
      });
    });

    // res.status(200).json({
    //   success: true,
    //   count: members.length,
    //   data: members
    // });
    res.render('map', { title: 'Team Alpha Alumni | Map', members: JSON.stringify(geojson) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

//--- run application
app.listen(3000, () => {
  console.log('listening on port 3000...');
});