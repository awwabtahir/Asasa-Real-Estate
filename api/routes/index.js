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
var ctrlCustomerProperty = require('../controllers/customerProperty');
var ctrlEmail = require('../controllers/email');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/getAgents', auth, ctrlProfile.getAgents);
router.post('/delete_agent', ctrlProfile.deleteAgent);
router.post('/update_agent', ctrlProfile.updateAgent);
router.post('/update_fav', ctrlProfile.updateFav);
router.post('/update_user', ctrlProfile.updateUser);

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

// customerProperty operations
router.post('/save_customerProperty', ctrlCustomerProperty.save);
router.get('/get_customerProperty', ctrlCustomerProperty.getAll);

// location operations
router.post('/save_location', ctrlLocation.save);
router.post('/update_location', ctrlLocation.update);
router.post('/get_city_locations', ctrlLocation.getByCityId);
router.get('/get_locations', ctrlLocation.getAll);

// customer operations
router.post('/save_customer', ctrlCustomer.save);
router.get('/get_customers', ctrlCustomer.getAll);

// email operations
router.post('/send_email', ctrlEmail.send);

module.exports = router;
