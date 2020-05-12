const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { Location, Member } = require('../db/models');

// home route
router.get('/', (req, res) => res.render('index', { subtitle: 'Home' }));

// map route
router.get('/map', async (req, res) => {
  let allMembers = [];

  try {
    // retrieve all the members from db and populate location object
    const members = await Member.find().populate('location');
    members.forEach(member => {
      const memberObj = member.toObject();
      allMembers.push(memberObj);
    });
    // send members to map view
    res.render('map', { subtitle: 'Map', members: allMembers });
  } catch (err) {
    res.status(500).json({ err });
  }
});

// add new member with geocoded location
router.post(
  '/members',
  [
    check('first_name')
      .escape()
      .notEmpty()
      .withMessage('first_name is required'),
    check('last_name').escape().notEmpty().withMessage('last_name is required'),
    check('company').escape(),
    check('position').escape(),
    check('location.city').escape(),
    check('location.state').escape(),
    check('email')
      .escape()
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please enter a valid email'),
    check('linkedin').escape(),
    check('image').escape()
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      first_name,
      last_name,
      company,
      position,
      location,
      email,
      linkedin,
      image
    } = req.body;

    // check is member exists (FIXME: first_name & last_name must be unique among members)
    let existingMember = await Member.findOne({
      first_name,
      last_name
    }).catch(err => next(err));
    if (existingMember) {
      console.log(existingMember);
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // check if location exists
    let existingLocation = await Location.findOne({
      city: location.city,
      state: location.state
    }).catch(err => next(err));
    if (!existingLocation) {
      existingLocation = new Location({
        city: location.city,
        state: location.state
      });
      existingLocation.convertLatLng();
    }

    // create new member
    existingMember = new Member({
      first_name,
      last_name,
      company: company || null,
      position: position || null,
      location: existingLocation.id,
      email: email || null,
      linkedin: linkedin || null,
      image: image || null
    });
    await existingMember.save();
    return res.json({ existingMember });
  }
);

module.exports = router;
