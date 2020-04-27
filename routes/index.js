const express = require('express');
const router = express.Router();
const { Location, Member } = require('../db/models');

// home route
router.get('/', (req, res) => res.render('index', { subtitle: 'Home' }));

// map route
router.get('/map', async (req, res) => {
  try {
    // retrieve all the members from db and populate location object
    const members = await Member.find().populate('location');
    members.forEach(member => {
      const memberObj = member.toObject();
      console.log(memberObj);
    });
    // send geojson to map view
    res.render('map', { subtitle: 'Map' });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
