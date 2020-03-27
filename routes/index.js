const express = require('express');
const router = express.Router();
const { Location, Member } = require('./db/models');

// home route
router.get('/', (req, res) => res.render('home', { title: 'Team Alpha Alumni | Home' }));

// map route
router.get('/map', async (req, res) => {
    // start empty geojson collection
    const geojson = {
        type: 'FeatureCollection',
        features: []
    };

    try {
        // retrieve all the members from db and populate location object
        const members = await Member.find().populate('location');
        // populate geojson collection with member information
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
        // send geojson to map view
        res.render('map', { title: 'Team Alpha Alumni | Map', members: JSON.stringify(geojson) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'server error' });
    }
});

module.exports = router;