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
var ctrlCustomer = require('../controllers/customer');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/getAgents', auth, ctrlProfile.getAgents);
router.post('/delete_agent', auth, ctrlProfile.deleteAgent);

// authentication
router.post('/register', auth, ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// ad operations
router.post('/save_ad', auth, ctrlAd.save);
router.post('/update_ad', auth, ctrlAd.update);
router.post('/delete_ad', auth, ctrlAd.delete);
router.get('/get_ads', ctrlAd.getAll);
router.post('/update_image', auth, ctrlAd.updateImage);

// city operations
router.post('/save_city', auth, ctrlCity.save);
router.get('/get_cities', ctrlCity.getAll);

// location operations
router.post('/save_location', auth, ctrlLocation.save);
router.post('/update_location', auth, ctrlLocation.update);
router.get('/get_locations', ctrlLocation.getAll);

// customer operations
router.post('/save_customer', ctrlCustomer.save);
router.get('/get_customers', ctrlCustomer.getAll);

module.exports = router;
