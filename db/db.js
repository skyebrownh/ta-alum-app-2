const mongoose = require('mongoose');
const { connectionString } = require('../config');
const { Location, Member } = require('./models');


mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('connected...'))
    .catch(err => console.error(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const geojson = {
    "type": "FeatureCollection",
    "features": []
};
db.once('open', () => {
    // TODO: query saved documents to show on map
    // {
    //     "type": "Feature",
    //     "properties": {
    //     "message": "Hello, AInc!",
    //     "iconSize": [45, 45]
    //     },
    //     "geometry": {
    //     "type": "Point",
    //     "coordinates": [-85.7585, 38.2527]
    //     }
    // }
    
    // query all Members from db to show on map
    Member
        .find({})
        .exec((err, res) => {
            if (err) return console.error(err);
            res.forEach(member => {
                const memberObj = member.toObject();
                geojson.features.push({
                    type: 'Feature',
                    properties: {
                        name: `${memberObj.first_name} ${memberObj.last_name}`,
                        iconSize: [45, 45]
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [memberObj.latitude, memberObj.longitude]
                    }
                });
            });
            // console.log(geojson.features.length);
            db.close();
        });
});