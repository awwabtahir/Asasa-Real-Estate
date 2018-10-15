var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlAd = require('../controllers/ad');
var ctrlCity = require('../controllers/city');
var ctrlLocation = require('../controllers/location');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// ad operations
router.post('/save_ad', ctrlAd.save);
router.post('/update_ad', ctrlAd.update);
router.post('/delete_ad', ctrlAd.delete);
router.get('/get_ads', ctrlAd.getAll);
router.post('/update_image', ctrlAd.updateImage);

// city operations
router.post('/save_city', ctrlCity.save);
router.get('/get_cities', ctrlCity.getAll);

// location operations
router.post('/save_location', ctrlLocation.save);
router.post('/update_location', ctrlLocation.update);
router.get('/get_locations', ctrlLocation.getAll);


module.exports = router;
