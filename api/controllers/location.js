var mongoose = require('mongoose');
var Location = mongoose.model('Location');

module.exports.save = function (req, res) {

  if (!req.body) {
    res.status(401).json({
      "message": "No data found!"
    });
  } else {
    var location = new Location(req.body);
    location.save(function (err) {
      res.status(200);
      res.json({
        "message": "success"
      });
    });
  }

};

module.exports.getAll = function (req, res) {
  Location
    .find()
    .exec(function (err, locations) {
      res.status(200).json(locations);
    });
};

module.exports.update = function (req, res) {
  var data = req.body;
  if (!data) {
    res.status(401).json({
      "message": "No data found!"
    });
  } else {
    var query = { '_id': data._id };
    delete data._id;
    Location.findOneAndUpdate(query, data, { new: true }, function (err, location) {
      res.status(200).json(location);
    });
  }

};