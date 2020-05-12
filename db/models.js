const mongoose = require('mongoose');
const { Client, Status } = require('@googlemaps/google-maps-services-js');
const { googleApiKey } = require('../config');

// google maps api client
const client = new Client({});

const locationSchema = mongoose.Schema({
  city: String,
  state: String, // state abbreviation
  latitude: Number,
  longitude: Number
});

locationSchema.methods.convertLatLng = function () {
  client
    .geocode({
      params: {
        address: `${this.city}, ${this.state}`,
        key: googleApiKey
      }
    })
    .then(res => {
      if (res.data.status === Status.OK) {
        this.latitude = res.data.results[0].geometry.location.lat;
        this.longitude = res.data.results[0].geometry.location.lng;
        this.save();
      } else {
        throw new Error(res.data.error_message);
      }
    })
    .catch(err => {
      throw new Error(err);
    });
};

const Location = mongoose.model('Location', locationSchema);

const memberSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  company: String,
  position: String,
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  linkedIn: String,
  image: String // default: placeholder img
});
const Member = mongoose.model('Member', memberSchema);

module.exports = { Location, Member };
