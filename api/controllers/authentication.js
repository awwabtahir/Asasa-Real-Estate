var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  if(req.body.access) user.access = req.body.access;
  if(req.body.cityId) user.cityId = req.body.cityId;
  if(req.body.locationId) user.locationId = req.body.locationId;
  if(req.body.subLocations) user.subLocations = req.body.subLocations;
  if(req.body.phone) user.phone = req.body.phone;

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token,
        "data": {
          userId : user._id,
          name: user.name,
          access : user.access,
          cityId : user.cityId,
          locationId : user.locationId,
          subLocations : user.subLocations
        }
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};