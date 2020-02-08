const mongoose = require('mongoose');
const { connectionString } = require('../config');
// const { Location, Member } = require('./models');

const connectdb = async () => {
    try {
        const conn = await mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`connected on ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectdb;

// const geojson = {
//     "type": "FeatureCollection",
//     "features": []
// };
// db.once('open', () => {
//     // TODO: query saved documents to show on map
//     // {
//     //     "type": "Feature",
//     //     "properties": {
//     //     "message": "Hello, AInc!",
//     //     "iconSize": [45, 45]
//     //     },
//     //     "geometry": {
//     //     "type": "Point",
//     //     "coordinates": [-85.7585, 38.2527]
//     //     }
//     // }
    
//     // query all Members from db to show on map
//     Member
//         .find({})
//         .exec((err, res) => {
//             if (err) return console.error(err);
//             res.forEach(member => {
//                 const memberObj = member.toObject();
//                 geojson.features.push({
//                     type: 'Feature',
//                     properties: {
//                         name: `${memberObj.first_name} ${memberObj.last_name}`,
//                         iconSize: [45, 45]
//                     },
//                     geometry: {
//                         type: 'Point',
//                         coordinates: [memberObj.latitude, memberObj.longitude]
//                     }
//                 });
//             });
//             // console.log(geojson.features.length);
//             db.close();
//         });
// });